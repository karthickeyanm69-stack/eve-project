import fs from 'fs';
const content = fs.readFileSync('C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\bb82ff14-a16a-467c-bacf-c1c51ee19a0f\\scratch\\roadmap_backup.tsx', 'utf8');
console.log('UTF-8 BOM/regular length:', content.length);
const lines = content.split('\n');
console.log('Lines count:', lines.length);
let found = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('test') || lines[i].includes('Question') || lines[i].includes('Quiz')) {
    found.push(`L${i+1}: ${lines[i].trim()}`);
  }
}
console.log('Matches:', found.slice(0, 30));
