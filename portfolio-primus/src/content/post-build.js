import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = path.join(__dirname, '../_redirects');
const destinationFile = path.join(__dirname, '../../dist/_redirects');

// Ensure the destination directory exists
fs.mkdirSync(path.dirname(destinationFile), { recursive: true });

// Copy the file
fs.copyFileSync(sourceFile, destinationFile);

console.log('✅ content.json copied to build folder successfully.');
