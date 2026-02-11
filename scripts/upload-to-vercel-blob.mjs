import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', 'migration-data', 'images');
const MAPPING_FILE = path.join(__dirname, '..', 'migration-data', 'image-url-mapping.json');

async function uploadImage(filePath, originalUrl) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  console.log(`Uploading ${fileName}...`);

  try {
    const blob = await put(fileName, fileBuffer, {
      access: 'public',
      addRandomSuffix: false
    });

    console.log(`  ✓ Uploaded: ${blob.url}`);
    return { originalUrl, newUrl: blob.url };
  } catch (error) {
    console.error(`  ✗ Error uploading ${fileName}:`, error.message);
    return { originalUrl, newUrl: null, error: error.message };
  }
}

async function main() {
  console.log('Starting Vercel Blob upload...\n');
  console.log('Make sure your BLOB_READ_WRITE_TOKEN is set!\n');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('✗ Images directory not found:', IMAGES_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const urlMapping = {};

  console.log(`Found ${files.length} images to upload\n`);

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);

    if (fs.statSync(filePath).isFile()) {
      // Try to find original URL from metadata
      const originalUrl = `https://eotvqshhniktonzuqzpz.supabase.co/storage/v1/object/public/images/${file}`;

      const result = await uploadImage(filePath, originalUrl);
      if (result.newUrl) {
        urlMapping[result.originalUrl] = result.newUrl;
      }
    }
  }

  // Save URL mapping for updating database
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(urlMapping, null, 2));
  console.log(`\n✓ URL mapping saved to ${MAPPING_FILE}`);
  console.log(`✓ Uploaded ${Object.keys(urlMapping).length}/${files.length} images`);
}

main();
