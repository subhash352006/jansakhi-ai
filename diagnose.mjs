import { JSDOM, VirtualConsole } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('dist/client/index.html', 'utf-8');

const virtualConsole = new VirtualConsole();
virtualConsole.on('error', (err) => console.error('[Browser Error Console]:', err));
virtualConsole.on('warn', (warn) => console.warn('[Browser Warn]:', warn));
virtualConsole.on('log', (log) => console.log('[Browser Log]:', log));
virtualConsole.on('jsdomError', (err) => console.error('[JSDOM Error]:', err));

console.log('Loading JSDOM with index.html...');
const dom = new JSDOM(html, {
  url: 'http://localhost:8080/',
  runScripts: 'dangerously',
  resources: 'usable',
  virtualConsole,
});

setTimeout(() => {
  const root = dom.window.document.getElementById('root');
  console.log('Root HTML length:', root?.innerHTML?.length || 0);
  console.log('Root HTML preview:', root?.innerHTML?.slice(0, 300));
  process.exit(0);
}, 2000);
