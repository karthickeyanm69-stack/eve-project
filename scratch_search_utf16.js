import fs from 'fs';

const buf = fs.readFileSync('C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\bb82ff14-a16a-467c-bacf-c1c51ee19a0f\\scratch\\roadmap_backup.tsx');
const content = buf.toString('utf16le');
const lines = content.split('\n');

console.log('Total lines decoded:', lines.length);
let count = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('testActive') || line.includes('testFinished') || line.includes('testPassed') || line.includes('lives')) {
    console.log(`L${i + 1}: ${line.trim()}`);
    count++;
  }
}
console.log('Found matches:', count);
