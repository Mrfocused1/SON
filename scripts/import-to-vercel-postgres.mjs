import pkg from 'pg';
const { Client } = pkg;
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

async function importTable(tableName, client) {
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
    // Quote columns named 'order' and handle JSON values
    const quotedColumns = columns.map(col => col === 'order' ? `"order"` : col);
    const values = columns.map(col => {
      const val = record[col];
      // Convert arrays and objects to JSON strings
      if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
        return JSON.stringify(val);
      }
      return val;
    });
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

    const query = `
      INSERT INTO ${tableName} (${quotedColumns.join(', ')})
      VALUES (${placeholders})
    `;

    try {
      await client.query(query, values);
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

  const connectionString = process.env.DATABASE_POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error('No connection string found');
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✓ Database connection successful\n');

    // Import each table
    for (const table of TABLES) {
      await importTable(table, client);
    }

    await client.end();
    console.log('\n✓ All data imported successfully!');
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

main();
