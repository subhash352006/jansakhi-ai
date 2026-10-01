import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ready = new Promise((resolve) => {
      this.ws.onopen = resolve;
    });
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }
}

async function run() {
  console.log('=== VERIFYING SETTINGS MENU & FONT CUSTOMIZATION REMOVAL ===\n');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1280,800'
  ]);

  try {
    let version = null;
    for (let i = 0; i < 20; i++) {
      try {
        version = await getJson('http://127.0.0.1:9222/json/version');
        if (version?.webSocketDebuggerUrl) break;
      } catch (e) {
        await delay(300);
      }
    }

    const cdp = new CDPClient(version.webSocketDebuggerUrl);
    await cdp.ready;

    const { targetId } = await cdp.send('Target.createTarget', { url: 'http://localhost:8080' });
    const targets = await getJson('http://127.0.0.1:9222/json/list');
    const pageTarget = targets.find(t => t.id === targetId);

    const pageCdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await pageCdp.ready;
    await pageCdp.send('Page.enable');
    await pageCdp.send('Runtime.enable');

    await delay(1500);

    // 1. Verify Font Size Adjuster is REMOVED
    const fontCheck = await pageCdp.eval(`(() => {
      const textSizeDiv = document.querySelector('[aria-label="Text size control"]');
      const fontButtons = Array.from(document.querySelectorAll('header button')).filter(b => 
        ['A', 'A+', 'A++'].includes(b.innerText.trim())
      );
      return {
        textSizeDivFound: !!textSizeDiv,
        fontButtonsCount: fontButtons.length
      };
    })()`);

    console.log('1. Font customization removal check:', fontCheck);
    if (!fontCheck.textSizeDivFound && fontCheck.fontButtonsCount === 0) {
      console.log('   ✓ CONFIRMED: Font customization option is completely removed from the Header.');
    } else {
      throw new Error('Font size controls still present!');
    }

    // 2. Verify Contrast Toggle STILL WORKS
    console.log('\n2. Testing Contrast / Dark theme toggle in Settings:');
    const beforeContrast = await pageCdp.eval(`document.documentElement.classList.contains('dark')`);
    console.log(`   Initial dark mode: ${beforeContrast}`);

    // Click Contrast toggle
    await pageCdp.eval(`(() => {
      const contrastBtn = Array.from(document.querySelectorAll('header button')).find(b => 
        b.getAttribute('aria-label')?.includes('contrast') || b.innerText.includes('Contrast')
      );
      if (contrastBtn) contrastBtn.click();
    })()`);

    await delay(300);

    const afterContrast = await pageCdp.eval(`document.documentElement.classList.contains('dark')`);
    console.log(`   After clicking Contrast toggle: dark mode is ${afterContrast}`);
    if (afterContrast !== beforeContrast) {
      console.log('   ✓ CONFIRMED: Contrast / Dark theme toggle works perfectly.');
    } else {
      throw new Error('Contrast toggle failed to change state!');
    }

    // 3. Verify Language Selector STILL WORKS
    console.log('\n3. Testing Language Selector in Settings:');
    const initialLang = await pageCdp.eval(`document.documentElement.lang`);
    console.log(`   Initial language: ${initialLang}`);

    // Change language to Hindi ('hi')
    await pageCdp.eval(`(() => {
      const select = document.querySelector('#language-select');
      if (select) {
        select.value = 'hi';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    })()`);

    await delay(500);

    const newLang = await pageCdp.eval(`(() => ({
      htmlLang: document.documentElement.lang,
      schemeTitle: document.querySelector('#main-content div span:last-child')?.innerText,
      tagline: document.querySelector('header p')?.innerText
    }))()`);
    console.log('   After selecting Hindi:', newLang);

    if (newLang.htmlLang === 'hi' && newLang.tagline.includes('आपकी आवाज़')) {
      console.log('   ✓ CONFIRMED: Language selector works perfectly in Settings.');
    } else {
      throw new Error('Language selection failed to update!');
    }

    // Capture screenshot of updated header with settings
    const screenshot = await pageCdp.send('Page.captureScreenshot', { format: 'png' });
    const screenshotPath = path.join(process.cwd(), 'header_settings_verified.png');
    fs.writeFileSync(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    console.log('\n✓ Saved screenshot to:', screenshotPath);

    console.log('\n=== ALL SETTINGS VERIFICATION CHECKS PASSED ===');
  } finally {
    chrome.kill();
  }
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
