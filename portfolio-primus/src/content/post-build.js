import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToCopy = ["_redirects", "sitemap.xml", "robots.txt"];
const sourceDir = path.join(__dirname, "../");
const destinationDir = path.join(__dirname, "../../dist/");

// Ensure the destination directory exists
fs.mkdirSync(destinationDir, { recursive: true });

// Copy each file
filesToCopy.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const destinationFile = path.join(destinationDir, file);

    if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destinationFile);
        console.log(`✅ ${file} copied to dist/ successfully.`);
    } else {
        console.warn(`⚠️  ${file} not found, skipping...`);
    }
});
