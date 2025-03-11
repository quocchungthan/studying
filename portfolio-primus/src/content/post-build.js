import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToCopy = ["_redirects", "sitemap.xml", "robots.txt"];
const sourceDir = path.join(__dirname, "../");
const destinationDir = path.join(__dirname, "../../dist/");
const buildSourceDir = path.join(__dirname, "./projects/");

// Ensure the destination directory exists
fs.mkdirSync(destinationDir, { recursive: true });

// Function to copy a file
function copyFile(source, destination) {
    if (fs.existsSync(source)) {
        fs.copyFileSync(source, destination);
        console.log(`✅ ${path.basename(source)} copied to dist/ successfully.`);
    } else {
        console.warn(`⚠️ ${path.basename(source)} not found, skipping...`);
    }
}

// Function to recursively copy a directory
function copyDirectory(source, destination) {
    if (fs.existsSync(source)) {
        // Create destination directory if it doesn't exist
        fs.mkdirSync(destination, { recursive: true });

        // Read the contents of the source directory
        const files = fs.readdirSync(source);

        // Iterate over each file/folder
        files.forEach((file) => {
            const sourceFile = path.join(source, file);
            const destinationFile = path.join(destination, file);

            // If it's a directory, recurse; otherwise, copy the file
            if (fs.statSync(sourceFile).isDirectory()) {
                copyDirectory(sourceFile, destinationFile);
            } else {
                fs.copyFileSync(sourceFile, destinationFile);
                console.log(`✅ ${sourceFile} copied to ${destinationFile}`);
            }
        });
    } else {
        console.warn(`⚠️ Source directory ${source} not found, skipping...`);
    }
}

// Copy each specified file
filesToCopy.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const destinationFile = path.join(destinationDir, file);
    copyFile(sourceFile, destinationFile);
});

// Copy the entire build directory into dist/
copyDirectory(buildSourceDir, destinationDir);
