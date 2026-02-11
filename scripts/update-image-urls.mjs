import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAPPING_FILE = path.join(__dirname, '..', 'migration-data', 'image-url-mapping.json');

async function updateImageUrls() {
  console.log('Loading image URL mappings...\n');

  if (!fs.existsSync(MAPPING_FILE)) {
    console.error('✗ Mapping file not found:', MAPPING_FILE);
    console.error('Please run upload-to-vercel-blob.mjs first!');
    process.exit(1);
  }

  const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
  const totalMappings = Object.keys(mapping).length;

  console.log(`Found ${totalMappings} URL mappings\n`);

  // Tables and columns that contain image URLs
  const updates = [
    { table: 'capabilities', column: 'icon_url' },
    { table: 'studio_images', column: 'image_url' },
    { table: 'gallery_images', column: 'image_url' },
    { table: 'shows', column: 'thumbnail_url' },
    { table: 'site_settings', column: 'logo_url' },
    { table: 'site_settings', column: 'favicon_url' }
  ];

  let updateCount = 0;

  for (const { table, column } of updates) {
    console.log(`Updating ${table}.${column}...`);

    try {
      // Get all records with image URLs
      const { rows } = await sql.query(
        `SELECT id, ${column} FROM ${table} WHERE ${column} IS NOT NULL`
      );

      for (const row of rows) {
        const oldUrl = row[column];

        // Find matching new URL
        const newUrl = mapping[oldUrl];

        if (newUrl) {
          await sql.query(
            `UPDATE ${table} SET ${column} = $1 WHERE id = $2`,
            [newUrl, row.id]
          );

          console.log(`  ✓ Updated record ${row.id}`);
          updateCount++;
        } else {
          console.log(`  ⚠️  No mapping found for: ${oldUrl}`);
        }
      }
    } catch (error) {
      console.error(`  ✗ Error updating ${table}.${column}:`, error.message);
    }
  }

  console.log(`\n✓ Updated ${updateCount} image URLs`);
}

async function main() {
  console.log('Starting image URL update...\n');

  try {
    // Test connection
    await sql`SELECT NOW()`;
    console.log('✓ Database connection successful\n');

    await updateImageUrls();
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

main();
