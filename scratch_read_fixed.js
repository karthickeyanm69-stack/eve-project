import fs from 'fs';
const content = fs.readFileSync('C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\bb82ff14-a16a-467c-bacf-c1c51ee19a0f\\scratch\\roadmap_backup_fixed.tsx', 'utf16le');
console.log('UTF-16 LE length:', content.length);
console.log(content.substring(0, 2000));
