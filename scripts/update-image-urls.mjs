import pkg from 'pg';
const { Client } = pkg;
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

  const connectionString = process.env.DATABASE_POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();

  // Tables and columns that contain image URLs
  const updates = [
    { table: 'home_content', columns: ['hero_background_image', 'featured_video_thumbnail', 'hero_background_image_mobile', 'featured_thumbnail_mobile'] },
    { table: 'gallery_images', columns: ['image_url', 'image_url_mobile'] },
    { table: 'shows', columns: ['thumbnail', 'thumbnail_mobile'] },
    { table: 'site_settings', columns: ['logo_url', 'logo_url_mobile'] }
  ];

  let updateCount = 0;

  for (const { table, columns } of updates) {
    console.log(`\nUpdating ${table}...`);

    try {
      // Get all records
      const result = await client.query(`SELECT * FROM ${table}`);

      for (const row of result.rows) {
        const updates = [];
        const values = [];
        let valueIndex = 1;

        columns.forEach(column => {
          const oldUrl = row[column];
          if (oldUrl && mapping[oldUrl]) {
            updates.push(`${column} = $${valueIndex}`);
            values.push(mapping[oldUrl]);
            valueIndex++;
            console.log(`  ✓ Will update ${column}: ${oldUrl.substring(0, 50)}...`);
          }
        });

        if (updates.length > 0) {
          values.push(row.id);
          await client.query(
            `UPDATE ${table} SET ${updates.join(', ')} WHERE id = $${valueIndex}`,
            values
          );
          updateCount += updates.length;
          console.log(`  ✓ Updated record ${row.id}`);
        }
      }
    } catch (error) {
      console.error(`  ✗ Error updating ${table}:`, error.message);
    }
  }

  await client.end();
  console.log(`\n✓ Updated ${updateCount} image URLs total`);
}

async function main() {
  console.log('Starting image URL update...\n');

  try {
    await updateImageUrls();
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

main();
