import fs from 'fs';

const buf = fs.readFileSync('C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\bb82ff14-a16a-467c-bacf-c1c51ee19a0f\\scratch\\roadmap_backup.tsx');
const content = buf.toString('utf16le');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].toLowerCase().includes('test')) {
    console.log(`L${i + 1}: ${lines[i].trim().substring(0, 100)}`);
  }
}
