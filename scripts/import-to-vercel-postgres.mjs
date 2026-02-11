import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIGRATION_DIR = path.join(__dirname, '..', 'migration-data');

// Tables to import in order (respecting dependencies)
const TABLES = [
  'home_content',
  'capabilities',
  'studio_images',
  'gallery_images',
  'shows',
  'shows_content',
  'roles',
  'join_content',
  'contact_content',
  'navigation',
  'social_links',
  'site_settings'
];

async function importTable(tableName) {
  const filePath = path.join(MIGRATION_DIR, `${tableName}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  No data file found for ${tableName}, skipping...`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (data.length === 0) {
    console.log(`⚠️  No records in ${tableName}, skipping...`);
    return;
  }

  console.log(`\nImporting ${data.length} records into ${tableName}...`);

  for (const record of data) {
    const columns = Object.keys(record).filter(key => key !== 'id');
    const values = columns.map(col => record[col]);
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

    const query = `
      INSERT INTO ${tableName} (${columns.join(', ')})
      VALUES (${placeholders})
    `;

    try {
      await sql.query(query, values);
      console.log(`  ✓ Imported record ${record.id || 'new'}`);
    } catch (error) {
      console.error(`  ✗ Error importing record:`, error.message);
      console.error(`  Record:`, record);
    }
  }

  console.log(`✓ Completed ${tableName}`);
}

async function main() {
  console.log('Starting Vercel Postgres import...\n');
  console.log('Make sure your POSTGRES_URL environment variable is set!\n');

  try {
    // Test connection
    const result = await sql`SELECT NOW()`;
    console.log('✓ Database connection successful\n');

    // Import each table
    for (const table of TABLES) {
      await importTable(table);
    }

    console.log('\n✓ All data imported successfully!');
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

main();
