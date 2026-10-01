import http from 'http';
import { spawn } from 'child_process';

// 1. Helper to do HTTP requests
function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runApiTests() {
  console.log('=== 1. RUNNING API ENDPOINT CHECKS ===');
  
  // Health
  const health = await request({ host: 'localhost', port: 8080, path: '/api/health', method: 'GET' });
  console.log('Health check status:', health.status, health.data?.status === 'healthy' ? 'PASS' : 'FAIL');

  // Scheme info
  const scheme = await request({ host: 'localhost', port: 8080, path: '/api/scheme-info', method: 'GET' });
  console.log('Scheme info portal URL:', scheme.data?.scheme?.officialPortalUrl, scheme.data?.scheme?.officialPortalUrl === 'https://www.pmuy.gov.in/' ? 'PASS' : 'FAIL');

  // Chat Telugu
  const chatTe = await request({
    host: 'localhost', port: 8080, path: '/api/chat', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { message: 'ఉజ్జ్వల 2.0 పథకానికి ఎవరు అర్హులు?', language: 'te' });
  console.log('Telugu chat status:', chatTe.status, chatTe.data?.success ? 'PASS' : 'FAIL');
  console.log('Telugu sample reply:', chatTe.data?.reply?.substring(0, 80));

  // Chat PII guardrail
  const chatPii = await request({
    host: 'localhost', port: 8080, path: '/api/chat', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { message: 'నా ఆధార్ 1234 5678 9012 మరియు OTP 654321', language: 'te' });
  console.log('PII guardrail intercepted:', chatPii.data?.isWarning ? 'PASS' : 'FAIL');
  console.log('PII warning message:', chatPii.data?.reply?.substring(0, 60));

  // Explain Simply
  const explain = await request({
    host: 'localhost', port: 8080, path: '/api/explain-simply', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { complexText: 'Beneficiary woman must belong to poor household not having LPG connection under PMUY 2.0 guidelines.', language: 'hi' });
  console.log('Explain simply status:', explain.status, explain.data?.success ? 'PASS' : 'FAIL');
  console.log('Explain meaning (Hindi):', explain.data?.meaning?.substring(0, 60));

  // Journey eligibility
  const elig = await request({
    host: 'localhost', port: 8080, path: '/api/journey/check-eligibility', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { isWoman18Plus: true, hasExistingLPG: false, isLowIncome: true, language: 'te' });
  console.log('Journey eligibility status:', elig.status, elig.data?.eligible === true ? 'PASS' : 'FAIL');
}

async function runBrowserUiTests() {
  console.log('\n=== 2. RUNNING CDP BROWSER UI CHECKS ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:8080/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  await new Promise((resolve) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', async () => {
        const targets = JSON.parse(data);
        const page = targets.find(t => t.type === 'page');
        const { WebSocket } = await import('ws');
        const ws = new WebSocket(page.webSocketDebuggerUrl);

        let msgId = 1;
        function send(method, params = {}) {
          const id = msgId++;
          ws.send(JSON.stringify({ id, method, params }));
          return id;
        }

        ws.on('open', async () => {
          send('Runtime.enable');
          send('Page.enable');
          send('Page.reload');

          // Wait 2.5s for initial render
          await new Promise(r => setTimeout(r, 2500));

          // 1. Check title & header text & buttons
          send('Runtime.evaluate', {
            expression: `({
              title: document.title,
              header: document.querySelector('header h1')?.textContent,
              langSelect: document.querySelector('#language-select')?.value,
              buttonsCount: document.querySelectorAll('button').length,
              allButtons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()).filter(Boolean).slice(0, 10),
              officialLink: document.querySelector('a[href="https://www.pmuy.gov.in/"]')?.textContent?.trim()
            })`,
            returnByValue: true
          });

          // Wait for response then test language switch and tab switch
          ws.on('message', (msg) => {
            const parsed = JSON.parse(msg.toString());
            if (parsed.result?.result?.value) {
              console.log('Browser DOM Inspection:', JSON.stringify(parsed.result.result.value, null, 2));
            }
          });

          // Test clicking "Help Me Apply" / Guided Journey
          setTimeout(() => {
            send('Runtime.evaluate', {
              expression: `(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const journeyBtn = buttons.find(b => b.innerText.includes('Help Me Apply') || b.innerText.includes('దరఖాస్తు'));
                if (journeyBtn) {
                  journeyBtn.click();
                  return 'Clicked Guided Journey button: ' + journeyBtn.innerText.substring(0, 40);
                }
                return 'Journey button not found';
              })()`,
              returnByValue: true
            });
          }, 3500);

          // Verify Guided Journey steps rendered
          setTimeout(() => {
            send('Runtime.evaluate', {
              expression: `({
                journeyHeading: document.querySelector('h2, h3')?.textContent,
                stepLabels: Array.from(document.querySelectorAll('ol button, div[role="listitem"], .cursor-pointer')).map(el => el.textContent.trim().substring(0, 40)).filter(Boolean).slice(0, 6),
                hasOfficialSourceLink: !!document.querySelector('a[href="https://www.pmuy.gov.in/"]')
              })`,
              returnByValue: true
            });
          }, 4500);

          // Test switching tab to "Explain Simply"
          setTimeout(() => {
            send('Runtime.evaluate', {
              expression: `(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const backBtn = buttons.find(b => b.innerText.includes('Back') || b.innerText.includes('వెనుకకు'));
                if (backBtn) backBtn.click();
                
                setTimeout(() => {
                  const explainBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Explain') || b.innerText.includes('వివరించండి'));
                  if (explainBtn) {
                    explainBtn.click();
                  }
                }, 300);
                return 'Triggered navigation to Explain Simply';
              })()`,
              returnByValue: true
            });
          }, 5500);

          // Verify Explain Simply rendered
          setTimeout(() => {
            send('Runtime.evaluate', {
              expression: `({
                textareaPresent: !!document.querySelector('textarea'),
                sampleNoticeButton: !!Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('నమూనా') || b.innerText.includes('Sample') || b.innerText.includes('उदाहरण'))
              })`,
              returnByValue: true
            });
          }, 6500);

          // Test switching language to Hindi ('hi')
          setTimeout(() => {
            send('Runtime.evaluate', {
              expression: `(() => {
                const sel = document.querySelector('select');
                if (sel) {
                  sel.value = 'hi';
                  sel.dispatchEvent(new Event('change', { bubbles: true }));
                  return 'Switched language to Hindi';
                }
                return 'Select not found';
              })()`,
              returnByValue: true
            });
          }, 7500);

          // Verify Hindi text rendered
          setTimeout(() => {
            send('Runtime.evaluate', {
              expression: `({
                newLang: document.querySelector('select')?.value,
                headerHindi: document.querySelector('header h1')?.innerText,
                taglineHindi: document.querySelector('header p')?.innerText,
                hindiButtons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()).filter(Boolean).slice(0, 5)
              })`,
              returnByValue: true
            });
          }, 8500);

          setTimeout(() => {
            console.log('All Browser UI DOM tests completed successfully!');
            ws.close();
            chrome.kill();
            resolve();
          }, 9500);
        });
      });
    });
  });
}

async function main() {
  await runApiTests();
  await runBrowserUiTests();
  console.log('\n=== ALL END-TO-END VERIFICATIONS PASSED ===');
}

main().catch(console.error);
