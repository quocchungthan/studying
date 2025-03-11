import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { parse } from 'querystring';

// List of supported formats
const SUPPORTED_FORMATS = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'avif', 'heif', 'tiff', 'heic', 'jp2'];

export default async (req, context) => {
  // Check if the HTTP method is GET
  if (req.method === 'GET') {
    // Extract query parameters
    const queryParams = parse(req.url.split('?')[1]);

    const { w, h, q, fit, auto, path: imagePath } = queryParams; // Get query params including the image path
    if (!imagePath) {
      return new Response(
        JSON.stringify({ message: 'Missing image path in query parameters' }),
        { status: 400 }
      );
    }

    // Validate the format (auto) parameter
    const autoFormat = auto && SUPPORTED_FORMATS.includes(auto.toLowerCase()) ? auto.toLowerCase() : 'webp'; // Default to webp if invalid

    // Default values
    const width = parseInt(w) || 800;
    const height = parseInt(h) || 600;
    const quality = parseInt(q) || 80;
    const fitOption = fit || 'cover';

    // Resolve the full image path from the public directory
    const imageFullPath = path.resolve('dist', imagePath);  // Adjust to match your project structure

    // Check if the image exists
    if (!fs.existsSync(imageFullPath)) {
      console.log(imageFullPath);
      return new Response(
        JSON.stringify({ message: `Image not found: ${imagePath}` }),
        { status: 404 }
      );
    }

    try {
      // Process the image using sharp
      const image = await sharp(imageFullPath)
        .resize(width, height, { fit: sharp.fit[fitOption] })
        .toFormat(autoFormat, { quality: quality })
        .toBuffer();

      // Set appropriate headers for the image type
      const contentType = `image/${autoFormat}`;

      return new Response(image, {
        status: 200,
        headers: { 'Content-Type': contentType },
      });
    } catch (error) {
      console.error('Error processing image:', error);
      return new Response(
        JSON.stringify({ message: `Error processing image: ${error.message}` }),
        { status: 500 }
      );
    }
  }

  // Handle non-GET requests
  return new Response(
    JSON.stringify({ message: 'Method Not Allowed' }),
    { status: 405 }
  );
};
