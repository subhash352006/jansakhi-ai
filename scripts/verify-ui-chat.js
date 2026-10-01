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
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1280,1200'
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

    // Toggle Dark Mode
    await pageCdp.eval(`(() => {
      const buttons = document.querySelectorAll('header .flex button');
      buttons[buttons.length - 1].click();
    })()`);

    await delay(500);

    // Click quick action "అర్హత ఉందా?"
    await pageCdp.eval(`(() => {
      const actionBtn = Array.from(document.querySelectorAll('button')).find(b => 
        b.innerText.includes('నాకు అర్హత ఉందా?') || b.innerText.includes('అర్హత')
      );
      if (actionBtn) actionBtn.click();
    })()`);

    console.log('Clicked action, awaiting AI response...');
    await delay(3500);

    // Scroll to chat section
    await pageCdp.eval(`(() => {
      const chat = document.querySelector('section[aria-label*="Conversation"]');
      if (chat) chat.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, 1000);
    })()`);

    await delay(500);

    const screenshot = await pageCdp.send('Page.captureScreenshot', { format: 'png' });
    const screenshotPath = path.join(process.cwd(), 'dark_mode_chat_verified.png');
    fs.writeFileSync(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    console.log('Saved chat screenshot to:', screenshotPath);
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
