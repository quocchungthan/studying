import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '.');
const translationFile = path.join(contentDir, 'en.json');
const outputFile = path.join(contentDir, '../assets/content.json');
const indexHtmlFile = path.join(__dirname, '../../index.html');

// Function to read JSON file
const loadJson = (filePath) => {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Function to read markdown files and transform them into structured objects
const loadMarkdownFiles = (dir, isProject = false, isExperience = false) => {
    const files = fs.readdirSync(dir);
    return files.filter(file => file.endsWith('.md')).map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const name = file.replace('.md', '');
        
        // Extracting details from the content
        const lines = content.split('\n').map(line => line.trim()).filter(line => line);
        const subtitle = lines[0] || '';
        const description = lines.slice(1).join(' ') || '';
        const images = lines.filter(line => line.startsWith('http'));

        if (isProject) {
            const [projectName, period] = name.split('_');
            return { name: projectName, subtitle: period, description: subtitle, images };
        }

        if (isExperience) {
            const [expName, period] = name.split('_');
            return { name: expName, period, description, subtitle };
        }
        
        return { name, subtitle, description, images };
    });
};

export const loadContent = () => {
    const translation = loadJson(translationFile);
    const projects = loadMarkdownFiles(path.join(contentDir, 'projects'), true);
    const experience = loadMarkdownFiles(path.join(contentDir, 'experience'), false, true);
    const expertise = loadMarkdownFiles(path.join(contentDir, 'expertise')).map(exp => ({ name: exp.name, level: exp.subtitle }));

    return { translation, projects, experience, expertise };
};

export const buildAsset = () => {
    fs.writeFileSync(outputFile, JSON.stringify(loadContent(), null, 2), 'utf8');
}

// Function to generate Open Graph and Twitter meta tags in index.html
const generateMetaTags = (content) => {
    let metaTags = '';
    if (content.projects.length > 0) {
        const project = content.projects[0];
        metaTags = `\n    <meta property="og:title" content="${project.name}" />\n    <meta property="og:description" content="${project.description}" />\n    <meta property="og:image" content="${project.images[0] || ''}" />\n    <meta property="og:type" content="website" />\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${project.name}" />\n    <meta name="twitter:description" content="${project.description}" />\n    <meta name="twitter:image" content="${project.images[0] || ''}" />\n    `;
    }
    
    let indexHtml = fs.readFileSync(indexHtmlFile, 'utf8');
    indexHtml = indexHtml.replace(/<!-- META_TAGS_START -->[\s\S]*<!-- META_TAGS_END -->/, `<!-- META_TAGS_START -->${metaTags}<!-- META_TAGS_END -->`);
    fs.writeFileSync(indexHtmlFile, indexHtml, 'utf8');
};


buildAsset();
generateMetaTags(loadContent());