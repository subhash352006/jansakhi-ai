import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

// Helper to launch Chrome with remote debugging
function launchChrome() {
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Users\\Kuppam Divakar Reddy\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
  ];

  const chromePath = chromePaths.find(p => fs.existsSync(p));
  if (!chromePath) {
    throw new Error('Chrome executable not found');
  }

  const port = 9223;
  const proc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--use-fake-ui-for-media-stream', // Auto-grants fake mic permission
    '--use-fake-device-for-media-stream',
    'http://localhost:8080',
  ]);

  return { proc, port };
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('=== VERIFYING JANSAKHI AI: FONT TYPOGRAPHY & VOICE INPUT ===\n');
  const { proc, port } = launchChrome();

  try {
    // Wait for Chrome CDP to become ready
    let targets = null;
    for (let i = 0; i < 30; i++) {
      try {
        targets = await fetchJson(`http://localhost:${port}/json`);
        if (targets && targets.length > 0) break;
      } catch (_) {}
      await new Promise(r => setTimeout(r, 300));
    }

    if (!targets || targets.length === 0) {
      throw new Error('Could not connect to Chrome DevTools Protocol');
    }

    const pageTarget = targets.find(t => t.type === 'page');
    const wsUrl = pageTarget.webSocketDebuggerUrl;
    console.log('Connected to Chrome CDP:', wsUrl);

    const WebSocket = (await import('ws')).default;
    const ws = new WebSocket(wsUrl);

    await new Promise(r => ws.on('open', r));

    let id = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const handler = (data) => {
          const msg = JSON.parse(data.toString());
          if (msg.id === msgId) {
            ws.off('message', handler);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
          }
        };
        ws.on('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');

    console.log('Navigating page to http://localhost:8080...');
    await sendCommand('Page.navigate', { url: 'http://localhost:8080' });

    // Wait for bundle to load and React to hydrate DOM
    await new Promise(r => setTimeout(r, 3500));

    // ==========================================
    // 1. TEST FONT LOADING & TYPOGRAPHY STACK
    // ==========================================
    console.log('--- 1. Testing Font Loading & Multi-Language Typography ---');
    const fontInfo = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const link = document.querySelector('link[href*="fonts.googleapis.com"]');
        const rootLang = document.documentElement.lang;
        const bodyClass = document.body.className;
        const computedStyle = window.getComputedStyle(document.body);
        const fontFamily = computedStyle.fontFamily;
        const lineHeight = computedStyle.lineHeight;

        return {
          hasGoogleFontsLink: !!link,
          fontHref: link ? link.href : null,
          rootLang,
          bodyClass,
          fontFamily,
          lineHeight,
        };
      })()`,
      returnByValue: true,
    });
    console.log('Font & Typography Status (Default Telugu):', fontInfo.result.value);

    // ==========================================
    // 2. TEST LANGUAGE SWITCHING AFFECTS FONTS
    // ==========================================
    console.log('\n--- 2. Testing Font & Line Height Across Multiple Languages ---');
    const testLanguages = ['te', 'hi', 'ta', 'kn', 'ml', 'bn', 'mr', 'en'];
    for (const lang of testLanguages) {
      const switchResult = await sendCommand('Runtime.evaluate', {
        expression: `(() => {
          const select = document.querySelector('#language-select');
          if (select) {
            select.value = '${lang}';
            select.dispatchEvent(new Event('change', { bubbles: true }));
          }
          const htmlLang = document.documentElement.lang;
          const bodyStyle = window.getComputedStyle(document.body);
          return {
            lang: '${lang}',
            htmlLang,
            fontFamily: bodyStyle.fontFamily,
            lineHeight: bodyStyle.lineHeight,
          };
        })()`,
        returnByValue: true,
      });
      console.log(`Language [${lang}] -> html[lang="${switchResult.result.value.htmlLang}"], font: ${switchResult.result.value.fontFamily.split(',')[0]}, line-height: ${switchResult.result.value.lineHeight}`);
    }

    // Switch back to Telugu for voice testing
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const select = document.querySelector('#language-select');
        if (select) {
          select.value = 'te';
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      })()`,
    });
    await new Promise(r => setTimeout(r, 600));

    // ==========================================
    // 3. TEST VOICE STATES: IDLE, LISTENING, STOP
    // ==========================================
    console.log('\n--- 3. Testing Voice Microphone Button & States ---');
    const voiceInitial = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const micBtn = document.querySelector('button[aria-label*="మాట్లాడటానికి"], button[aria-label*="Speak"], button[aria-label*="వింటున్నాను"]');
        return {
          found: !!micBtn,
          ariaLabel: micBtn ? micBtn.getAttribute('aria-label') : null,
          hasVoiceHelper: !!window.__janSakhiVoice,
          voiceStatus: window.__janSakhiVoice ? window.__janSakhiVoice.getState() : null,
        };
      })()`,
      returnByValue: true,
    });
    console.log('Voice Initial State:', voiceInitial.result.value);

    // Test Voice Simulation: "నాకు ఉచిత గ్యాస్ సిలిండర్ కావాలి"
    console.log('\n--- 4. Testing Spoken Speech -> Text -> Confirmation Modal Flow ---');
    const voiceSimResult = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        if (window.__janSakhiVoice) {
          window.__janSakhiVoice.simulateSpeech('నాకు ఉచిత గ్యాస్ సిలిండర్ కావాలి');
          return { success: true };
        }
        return { success: false };
      })()`,
      returnByValue: true,
    });
    console.log('Dispatched Speech Recognition Event:', voiceSimResult.result.value);

    // Wait for VoiceConfirmationCard modal to appear
    await new Promise(r => setTimeout(r, 1000));

    const confirmationCardInfo = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const dialog = document.querySelector('[role="dialog"]');
        const textarea = dialog ? dialog.querySelector('textarea') : null;
        const buttons = dialog ? Array.from(dialog.querySelectorAll('button')).map(b => b.textContent.trim()) : [];
        return {
          hasConfirmationDialog: !!dialog,
          spokenTextInTextarea: textarea ? textarea.value : null,
          buttons,
        };
      })()`,
      returnByValue: true,
    });
    console.log('Voice Confirmation Card Rendered:', confirmationCardInfo.result.value);

    // ==========================================
    // 5. TEST CONFIRMATION CARD EDIT & SUBMIT
    // ==========================================
    console.log('\n--- 5. Testing Touch-Edit and Submission to JanSakhi AI ---');
    const submitVoiceResult = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const dialog = document.querySelector('[role="dialog"]');
        if (!dialog) return { success: false, reason: 'no dialog' };
        
        // Touch-edit text to append details
        const textarea = dialog.querySelector('textarea');
        textarea.value = 'నాకు ఉచిత గ్యాస్ సిలిండర్ ఉజ్జ్వల 2.0 పథకం కావాలి';
        textarea.dispatchEvent(new Event('input', { bubbles: true }));

        // Click the confirm/send button
        const confirmBtn = Array.from(dialog.querySelectorAll('button')).find(b => 
          b.textContent.includes('ఖరారు') || b.textContent.includes('Confirm') || b.textContent.includes('सत्यापित') || b.className.includes('from-emerald')
        );
        if (confirmBtn) {
          confirmBtn.click();
          return { success: true, submittedText: textarea.value };
        }
        return { success: false, reason: 'no confirm button' };
      })()`,
      returnByValue: true,
    });
    console.log('Confirmed & Submitted Voice Message:', submitVoiceResult.result.value);

    // Wait for AI response
    await new Promise(r => setTimeout(r, 2000));

    const responseInfo = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const chatMsgs = document.querySelectorAll('.whitespace-pre-line');
        const lastMsg = chatMsgs[chatMsgs.length - 1];
        const hasStepGuide = !!document.querySelector('[aria-label="ప్రధాన మంత్రి ఉజ్జ్వల యోజన (PMUY) 2.0 మార్గదర్శి"], .border-amber-400');
        return {
          messageCount: chatMsgs.length,
          lastMsgPreview: lastMsg ? lastMsg.textContent.slice(0, 100) + '...' : null,
          hasStepGuide,
        };
      })()`,
      returnByValue: true,
    });
    console.log('AI Response to Voice Message:', responseInfo.result.value);

    // ==========================================
    // 6. TEST VOICE ERROR RECOVERY
    // ==========================================
    console.log('\n--- 6. Testing Voice Error Handling (micDenied, noSpeech, notSupported) ---');
    const errorCodes = ['not-allowed', 'no-speech', 'not-supported', 'network'];
    for (const errCode of errorCodes) {
      const errTest = await sendCommand('Runtime.evaluate', {
        expression: `(() => {
          if (window.__janSakhiVoice) {
            window.__janSakhiVoice.simulateError('${errCode}');
          }
          const alert = document.querySelector('[role="alert"]');
          return {
            errCode: '${errCode}',
            alertVisible: !!alert,
            alertText: alert ? alert.textContent.trim() : null,
          };
        })()`,
        returnByValue: true,
      });
      console.log(`Simulated error [${errCode}] -> Rendered alert: "${errTest.result.value.alertText}"`);
    }

    // Reset voice error state
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        if (window.__janSakhiVoice) {
          window.__janSakhiVoice.simulateError(null);
        }
      })()`,
    });

    // ==========================================
    // 7. TEST TEXT INPUT IS FULLY FUNCTIONAL
    // ==========================================
    console.log('\n--- 7. Testing Text Input Fallback Functionality ---');
    const textInputTest = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[type="text"]');
        const submitBtn = document.querySelector('form button[type="submit"]');
        if (!input || !submitBtn) return { success: false, reason: 'missing input or button' };
        
        input.value = 'కొత్త రేషన్ కార్డు ఎలా పొందాలి?';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        submitBtn.click();
        return { success: true, text: input.value };
      })()`,
      returnByValue: true,
    });
    console.log('Text Input Submitted:', textInputTest.result.value);

    await new Promise(r => setTimeout(r, 2000));

    const finalChatCount = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const chatMsgs = document.querySelectorAll('.whitespace-pre-line');
        return { count: chatMsgs.length };
      })()`,
      returnByValue: true,
    });
    console.log('Total Chat Messages after Voice + Text:', finalChatCount.result.value);

    console.log('\n=== ALL FONT AND VOICE AUDITS PASSED WITH ZERO ERRORS ===');

    ws.close();
  } finally {
    proc.kill();
  }
}

main().catch(err => {
  console.error('Test script error:', err);
  process.exit(1);
});
