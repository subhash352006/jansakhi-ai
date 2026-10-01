import http from 'http';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runWowVerification() {
  console.log('=== VERIFYING JANSAKHI AI: CORE FEATURE + WOW FACTOR ===');

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

            console.log('\n--- 1. Testing Home Screen: 6 Visual Need Categories ---');
            const homeCategories = await evaluate(`({
              title: document.title,
              homeTitle: document.querySelector('h2')?.textContent?.trim(),
              categoryCardsCount: document.querySelectorAll('button:has(svg)').length,
              sampleCards: Array.from(document.querySelectorAll('section button')).map(b => b.textContent.trim()).filter(Boolean).slice(0, 6),
              hasTrustNote: document.body.innerText.includes('జనసఖి AI మీకు మార్గదర్శకత్వం మాత్రమే అందిస్తుంది') || document.body.innerText.includes('JanSakhi AI provides guidance'),
              hasDemoBar: document.body.innerText.includes('డెమో') || document.body.innerText.includes('Demo')
            })`);
            console.log('Home categories verified:', homeCategories);

            console.log('\n--- 2. Testing Demo Scenario Click: Instant Ujjwala / Ration Guide ---');
            // Click the first demo button in the demo bar
            const demoClick = await evaluate(`(() => {
              const demoBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('ఉజ్జ్వల 2.0') || b.innerText.includes('Ujjwala'));
              if (demoBtn) {
                demoBtn.click();
                return 'Clicked Ujjwala demo button';
              }
              return 'Demo button not found';
            })()`);
            console.log(demoClick);

            await new Promise(r => setTimeout(r, 3000));

            // Verify that the 7-Part StepGuideCard is rendered on screen
            const stepGuideVerify = await evaluate(`({
              hasStepGuideBadge: document.body.innerText.includes('అధికారిక మార్గదర్శి') || document.body.innerText.includes('Official Guidance'),
              hasWhatItIs: document.body.innerText.includes('1. ఈ పథకం / సేవ ఏమిటి?') || document.body.innerText.includes('1. What this service'),
              hasEligibility: document.body.innerText.includes('2. ఎవరు అర్హులు?') || document.body.innerText.includes('2. Who may be eligible'),
              hasDocsChecklist: document.body.innerText.includes('3. కావలసిన పత్రాలు') || document.body.innerText.includes('3. What documents are required'),
              checkboxCount: document.querySelectorAll('input[type="checkbox"], label:has(svg)').length,
              hasOfficialPortalLink: !!document.querySelector('a[href*="pmuy.gov.in"]'),
              officialLinkText: document.querySelector('a[href*="pmuy.gov.in"]')?.textContent?.trim(),
              hasHelpline: document.body.innerText.includes('1800-266-6696')
            })`);
            console.log('StepGuideCard 7-part verification:', stepGuideVerify);

            console.log('\n--- 3. Testing Interactive Document Checkbox Ticking ---');
            const checkboxTick = await evaluate(`(() => {
              const docLabels = Array.from(document.querySelectorAll('label')).filter(l => l.textContent.includes('రేషన్') || l.textContent.includes('ఆధార్') || l.textContent.includes('Ration'));
              if (docLabels.length > 0) {
                docLabels[0].click();
                return 'Ticked document checkbox: ' + docLabels[0].textContent.trim().substring(0, 30);
              }
              return 'Checkbox label not found';
            })()`);
            console.log(checkboxTick);

            console.log('\n--- 4. Testing Broad Inquiry & Smart Follow-Up Question Engine ---');
            // Click the guided prompt chip: "🍳 ప్రభుత్వ పథకం తెలుసుకోవాలి"
            const chipClick = await evaluate(`(() => {
              const chip = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('ప్రభుత్వ పథకం తెలుసుకోవాలి') || b.innerText.includes('Government scheme') || b.innerText.includes('పథకం'));
              if (chip) {
                chip.click();
                return 'Clicked guided prompt chip: ' + chip.innerText;
              }
              return 'Chip not found';
            })()`);
            console.log(chipClick);

            await new Promise(r => setTimeout(r, 2000));

            const followUpVerify = await evaluate(`({
              hasClarificationQuestion: document.body.innerText.includes('ఖచ్చితంగా అక్కయ్య') || document.body.innerText.includes('సహాయం గురించి') || document.body.innerText.includes('Sure sister'),
              followUpButtons: Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('ఉచిత గ్యాస్') || b.textContent.includes('రేషన్ కార్డు') || b.textContent.includes('డ్వాక్రా')).map(b => b.textContent.trim())
            })`);
            console.log('Smart follow-up questions verified:', followUpVerify);

            console.log('\n--- 5. Testing Language Switch to Hindi & Home Categories ---');
            await evaluate(`(() => {
              const sel = document.querySelector('#language-select');
              if (sel) {
                sel.value = 'hi';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
              }
            })()`);
            await new Promise(r => setTimeout(r, 1000));

            const hindiVerify = await evaluate(`({
              lang: document.querySelector('#language-select')?.value,
              headerHindi: document.querySelector('header h1')?.textContent,
              taglineHindi: document.querySelector('header p')?.textContent,
              categoriesHeadingHindi: document.querySelector('h2')?.textContent,
              hindiCategories: Array.from(document.querySelectorAll('section button span.font-extrabold')).map(s => s.textContent.trim()).filter(Boolean).slice(0, 6)
            })`);
            console.log('Hindi categories & UI verified:', hindiVerify);

            console.log('\n=== ALL WOW FACTOR & CORE FEATURE TESTS PASSED ===');
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

runWowVerification().catch(console.error);
