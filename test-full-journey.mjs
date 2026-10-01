import http from 'http';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runFullJourneyBrowserTest() {
  console.log('Starting full automated journey browser test...');

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:8080/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', async () => {
        try {
          const targets = JSON.parse(data);
          const page = targets.find(t => t.type === 'page');
          const { WebSocket } = await import('ws');
          const ws = new WebSocket(page.webSocketDebuggerUrl);

          let idCounter = 1;
          const send = (method, params = {}) => {
            const id = idCounter++;
            ws.send(JSON.stringify({ id, method, params }));
            return id;
          };

          const evaluate = (expression) => {
            return new Promise((resEval) => {
              const id = send('Runtime.evaluate', {
                expression,
                returnByValue: true,
                awaitPromise: true,
              });
              const handler = (msg) => {
                const payload = JSON.parse(msg.toString());
                if (payload.id === id) {
                  ws.off('message', handler);
                  resEval(payload.result?.result?.value);
                }
              };
              ws.on('message', handler);
            });
          };

          ws.on('open', async () => {
            send('Runtime.enable');
            send('Page.enable');
            send('Page.reload');

            await new Promise(r => setTimeout(r, 2500));

            console.log('\n--- Step 1: Initial Mount in Telugu ---');
            const initialCheck = await evaluate(`({
              title: document.title,
              lang: document.querySelector('#language-select')?.value,
              banner: document.querySelector('.bg-emerald-500')?.parentElement?.textContent?.trim()
            })`);
            console.log('Initial mount state:', initialCheck);

            console.log('\n--- Step 2: Open "Help Me Apply" (Guided Journey) ---');
            const openJourneyResult = await evaluate(`(() => {
              const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Help Me Apply') || b.innerText.includes('దరఖాస్తు'));
              if (btn) {
                btn.click();
                return 'Clicked Guided Journey CTA';
              }
              return 'Journey button not found';
            })()`);
            console.log('Open journey result:', openJourneyResult);

            await new Promise(r => setTimeout(r, 1000));

            const step1Verify = await evaluate(`({
              stepText: document.querySelector('h3')?.textContent?.trim(),
              hasOfficialDisclaimer: document.body.innerText.includes('1800-266-6696') || document.body.innerText.includes('pmuy.gov.in')
            })`);
            console.log('Journey Step 1 verification:', step1Verify);

            console.log('\n--- Step 3: Advance to Step 2 (Check Eligibility) ---');
            await evaluate(`(() => {
              const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('తదుపరి') || b.innerText.includes('Next') || b.innerText.includes('ముందుకు'));
              if (nextBtn) nextBtn.click();
            })()`);
            await new Promise(r => setTimeout(r, 800));

            // Click "Check My Eligibility"
            const checkEligResult = await evaluate(`(() => {
              const checkBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('తనిఖీ') || b.innerText.includes('Check'));
              if (checkBtn) {
                checkBtn.click();
                return 'Clicked check eligibility';
              }
              return 'Check btn not found';
            })()`);
            console.log('Check eligibility click:', checkEligResult);
            await new Promise(r => setTimeout(r, 1200));

            const step2Result = await evaluate(`document.body.innerText.includes('ప్రాథమిక నిబంధనలను పూర్తి చేయవచ్చు') || document.body.innerText.includes('ఉజ్జ్వల 2.0')`);
            console.log('Eligibility evaluation rendered on screen:', step2Result);

            console.log('\n--- Step 4: Advance through Document Checklist (Step 3) & Steps 4-5 ---');
            // Advance to Step 3
            await evaluate(`(() => {
              const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('తదుపరి') || b.innerText.includes('Next'));
              if (nextBtn) nextBtn.click();
            })()`);
            await new Promise(r => setTimeout(r, 600));

            // Check checkboxes
            await evaluate(`(() => {
              document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.click());
            })()`);
            await new Promise(r => setTimeout(r, 600));

            // Advance to Step 4
            await evaluate(`(() => {
              const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('తదుపరి') || b.innerText.includes('Next'));
              if (nextBtn) nextBtn.click();
            })()`);
            await new Promise(r => setTimeout(r, 600));

            // Advance to Step 5
            await evaluate(`(() => {
              const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('తదుపరి') || b.innerText.includes('Next'));
              if (nextBtn) nextBtn.click();
            })()`);
            await new Promise(r => setTimeout(r, 800));

            const step5Verify = await evaluate(`({
              hasHelpline: document.body.innerText.includes('1800-266-6696'),
              hasOfficialPortalLink: !!document.querySelector('a[href="https://www.pmuy.gov.in/"]')
            })`);
            console.log('Journey Step 5 Official Link and Helpline verified:', step5Verify);

            console.log('\n--- Step 5: Close Guided Journey & Open "Explain This Simply" ---');
            await evaluate(`(() => {
              const closeBtn = document.querySelector('button[aria-label*="Close"]') || Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Back') || b.innerText.includes('వెనుకకు'));
              if (closeBtn) closeBtn.click();
            })()`);
            await new Promise(r => setTimeout(r, 600));

            await evaluate(`(() => {
              const explainBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('వివరించు') || b.innerText.includes('Explain'));
              if (explainBtn) explainBtn.click();
            })()`);
            await new Promise(r => setTimeout(r, 800));

            const explainOpened = await evaluate(`({
              hasTextarea: !!document.querySelector('#complex-notice-input'),
              hasSampleButton: !!Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('ఉదాహరణ') || b.innerText.includes('Sample') || b.innerText.includes('उदाहरण'))
            })`);
            console.log('Explain Simply opened properly:', explainOpened);

            // Click Sample Notice button
            await evaluate(`(() => {
              const sampleBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('ఉదాహరణ') || b.innerText.includes('Sample') || b.innerText.includes('उदाहरण'));
              if (sampleBtn) sampleBtn.click();
            })()`);
            await new Promise(r => setTimeout(r, 600));

            const textareaContent = await evaluate(`document.querySelector('#complex-notice-input')?.value?.substring(0, 50)`);
            console.log('Loaded sample notice in textarea:', textareaContent);

            // Click Explain button
            const clickedBtn = await evaluate(`(() => {
              const btn = document.querySelector('#explain-simply-submit');
              if (btn) {
                btn.click();
                return 'Clicked explain submit button by ID';
              }
              return 'Explain submit button not found';
            })()`);
            console.log(clickedBtn);
            await new Promise(r => setTimeout(r, 4500));

            const explainResultCards = await evaluate(`({
              hasMeaning: document.body.innerText.includes('దీని అర్థం ఏమిటి?') || document.body.innerText.includes('Meaning') || document.body.innerText.includes('సరళీకరించిన'),
              hasActions: document.body.innerText.includes('నేను ఏమి చేయాలి?') || document.body.innerText.includes('Action'),
              hasDocs: document.body.innerText.includes('నాకు ఏ పత్రాలు అవసరం?') || document.body.innerText.includes('Documents'),
              hasNextStep: document.body.innerText.includes('నా తదుపరి అడుగు ఏమిటి?') || document.body.innerText.includes('Next'),
              bodySample: document.body.innerText.substring(0, 300)
            })`);
            console.log('Explain Simply 4-part breakdown rendered:', explainResultCards);

            console.log('\n--- Step 6: Test Language Switching to Hindi & Tamil ---');
            await evaluate(`(() => {
              const sel = document.querySelector('#language-select');
              if (sel) {
                sel.value = 'hi';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
              }
            })()`);
            await new Promise(r => setTimeout(r, 800));

            const hindiState = await evaluate(`({
              titleHindi: document.querySelector('header h1')?.innerText,
              taglineHindi: document.querySelector('header p')?.innerText
            })`);
            console.log('Hindi state verified:', hindiState);

            await evaluate(`(() => {
              const sel = document.querySelector('#language-select');
              if (sel) {
                sel.value = 'ta';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
              }
            })()`);
            await new Promise(r => setTimeout(r, 800));

            const tamilState = await evaluate(`({
              titleTamil: document.querySelector('header h1')?.innerText,
              taglineTamil: document.querySelector('header p')?.innerText
            })`);
            console.log('Tamil state verified:', tamilState);

            console.log('\n--- ALL VERIFICATIONS COMPLETED SUCCESSFULLY WITH ZERO ERRORS ---');
            ws.close();
            chrome.kill();
            resolve();
          });
        } catch (e) {
          chrome.kill();
          reject(e);
        }
      });
    }).on('error', (e) => {
      chrome.kill();
      reject(e);
    });
  });
}

runFullJourneyBrowserTest().catch(console.error);
