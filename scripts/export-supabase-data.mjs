import { createClient } from '../node_modules/@supabase/supabase-js/dist/module/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase credentials
const supabaseUrl = 'https://eotvqshhniktonzuqzpz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdHZxc2hobmlrdG9uenVxenB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDAyMzk0MiwiZXhwIjoyMDc5NTk5OTQyfQ.8lgy_y7NwXE2ajvCHZv9e236fT4v1toM6vgIv1EkfQw';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Tables to export
const tables = [
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

async function exportData() {
  const exportDir = path.join(__dirname, '../migration-data');

  // Create export directory if it doesn't exist
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  console.log('Starting Supabase data export...\n');

  const allData = {};

  for (const table of tables) {
    try {
      console.log(`Exporting ${table}...`);
      const { data, error } = await supabase.from(table).select('*');

      if (error) {
        console.error(`Error exporting ${table}:`, error);
        allData[table] = [];
      } else {
        allData[table] = data || [];
        console.log(`✓ Exported ${data?.length || 0} rows from ${table}`);
      }
    } catch (err) {
      console.error(`Exception exporting ${table}:`, err);
      allData[table] = [];
    }
  }

  // Save all data to a JSON file
  const dataFile = path.join(exportDir, 'supabase-data.json');
  fs.writeFileSync(dataFile, JSON.stringify(allData, null, 2));
  console.log(`\n✓ All data exported to ${dataFile}`);

  // Create a summary
  console.log('\n=== Export Summary ===');
  for (const [table, data] of Object.entries(allData)) {
    console.log(`${table}: ${data.length} rows`);
  }

  return allData;
}

exportData().catch(console.error);
