import { spawn } from 'child_process';
import http from 'http';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
console.log('Launching Chrome with remote debugging on port 9222...');

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:8080/'
]);

chrome.stderr.on('data', (d) => {
  // Uncomment if needed: console.error('chrome stderr:', d.toString());
});

await new Promise(r => setTimeout(r, 2000));

// Query CDP version
http.get('http://127.0.0.1:9222/json/list', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', async () => {
    try {
      const targets = JSON.parse(data);
      console.log('Found Chrome targets:', targets.length);
      const page = targets.find(t => t.type === 'page');
      if (!page) {
        console.error('No page target found');
        chrome.kill();
        process.exit(1);
      }

      console.log('Connecting to WebSocket:', page.webSocketDebuggerUrl);
      const { WebSocket } = await import('ws');
      const ws = new WebSocket(page.webSocketDebuggerUrl);

      ws.on('open', () => {
        console.log('Connected to Chrome DevTools Protocol!');
        // Enable Console and Runtime domains
        ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
        // Reload page to catch all startup logs
        ws.send(JSON.stringify({ id: 4, method: 'Page.reload' }));
      });

      ws.on('message', (msg) => {
        const payload = JSON.parse(msg.toString());
        if (payload.id === 10) {
          console.log('[EVALUATION ROOT INNERHTML RESULT]:', payload.result?.result?.value ? `HTML Length: ${payload.result.result.value.length} chars (starts with: ${payload.result.result.value.substring(0, 150)}...)` : 'EMPTY / NULL');
        } else if (payload.method === 'Runtime.consoleAPICalled') {
          console.log('[BROWSER CONSOLE]', payload.params.type, payload.params.args.map(a => a.value || a.description || JSON.stringify(a)));
        } else if (payload.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER UNCAUGHT EXCEPTION]:', payload.params.exceptionDetails);
        }
      });

      setTimeout(() => {
        // Query root element innerHTML
        ws.send(JSON.stringify({
          id: 10,
          method: 'Runtime.evaluate',
          params: { expression: 'document.getElementById("root")?.innerHTML' }
        }));
      }, 3000);

      setTimeout(() => {
        console.log('Done capturing.');
        ws.close();
        chrome.kill();
        process.exit(0);
      }, 4500);

    } catch (e) {
      console.error('Error parsing CDP targets:', e);
      chrome.kill();
      process.exit(1);
    }
  });
}).on('error', (e) => {
  console.error('Failed to connect to Chrome on 9222:', e);
  chrome.kill();
  process.exit(1);
});
