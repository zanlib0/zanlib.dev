#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const lang = process.argv[2];
if (!lang || !['en', 'pl'].includes(lang)) {
  console.error('Usage: node create-jot.js <en|pl>');
  process.exit(1);
}

const now = new Date();
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0');
const year = now.getFullYear();
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const filename = `${day}${month}${year}${hours}${minutes}${seconds}.md`;
const filepath = join(__dirname, '..', 'src', 'content', 'jots', lang, filename);

// Format pubDate: "18 Nov 2025"
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pubDate = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

const content = `---
pubDate: ${pubDate}
---

`;

writeFileSync(filepath, content);
console.log(`Created: ${filepath}`);

const editor = process.env.EDITOR || 'vim';
const editorProcess = spawn(editor, [filepath], { stdio: 'inherit' });

editorProcess.on('exit', (code) => {
  process.exit(code || 0);
});
