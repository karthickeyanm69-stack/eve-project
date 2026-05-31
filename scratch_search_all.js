import fs from 'fs';
import path from 'path';

const scratchDir = 'C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\bb82ff14-a16a-467c-bacf-c1c51ee19a0f\\scratch';
const files = fs.readdirSync(scratchDir);

for (const file of files) {
  if (file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
    const filePath = path.join(scratchDir, file);
    const buf = fs.readFileSync(filePath);
    
    // Check if contains "test" in different encodings
    const strUtf8 = buf.toString('utf8');
    const strUtf16 = buf.toString('utf16le');
    
    if (strUtf8.includes('test') || strUtf8.includes('lives') || strUtf8.includes('timer')) {
      console.log(`UTF-8 Match found in: ${file}, size: ${buf.length}`);
    }
    if (strUtf16.includes('test') || strUtf16.includes('lives') || strUtf16.includes('timer')) {
      console.log(`UTF-16 Match found in: ${file}, size: ${buf.length}`);
    }
  }
}
