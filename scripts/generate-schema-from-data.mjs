import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIGRATION_DIR = path.join(__dirname, '..', 'migration-data');

const TABLES = [
  'home_content', 'capabilities', 'studio_images', 'gallery_images',
  'shows', 'shows_content', 'roles', 'join_content', 'contact_content',
  'navigation', 'social_links', 'site_settings'
];

function getPostgresType(value) {
  if (value === null) return 'TEXT';
  if (typeof value === 'boolean') return 'BOOLEAN';
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'INTEGER' : 'DECIMAL';
  }
  if (typeof value === 'string') {
    if (value.match(/^\d{4}-\d{2}-\d{2}T/)) return 'TIMESTAMP';
    if (value.length > 500) return 'TEXT';
    return 'VARCHAR(500)';
  }
  if (Array.isArray(value)) return 'JSONB';
  if (typeof value === 'object') return 'JSONB';
  return 'TEXT';
}

function generateTableSchema(tableName) {
  const filePath = path.join(MIGRATION_DIR, `${tableName}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (data.length === 0) {
    return null;
  }

  const allKeys = new Set();
  const columnTypes = {};

  // Collect all unique keys and infer types
  data.forEach(record => {
    Object.keys(record).forEach(key => {
      allKeys.add(key);
      if (!columnTypes[key]) {
        columnTypes[key] = getPostgresType(record[key]);
      }
    });
  });

  let sql = `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;

  const columns = [];
  allKeys.forEach(key => {
    if (key === 'id') {
      columns.push(`  id UUID PRIMARY KEY DEFAULT gen_random_uuid()`);
    } else if (key === 'order') {
      columns.push(`  "order" ${columnTypes[key]}`);
    } else {
      columns.push(`  ${key} ${columnTypes[key]}`);
    }
  });

  sql += columns.join(',\n');
  sql += '\n);\n';

  return sql;
}

let fullSchema = '-- Auto-generated schema from exported data\n\n';

TABLES.forEach(table => {
  const schema = generateTableSchema(table);
  if (schema) {
    fullSchema += `-- ${table}\n${schema}\n`;
  }
});

// Add indexes
fullSchema += `
-- Indexes
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON gallery_images("order");
CREATE INDEX IF NOT EXISTS idx_shows_order ON shows("order");
CREATE INDEX IF NOT EXISTS idx_roles_order ON roles("order");
CREATE INDEX IF NOT EXISTS idx_navigation_order ON navigation("order");
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links("order");
`;

fs.writeFileSync(
  path.join(__dirname, 'create-schema-auto.sql'),
  fullSchema
);

console.log('✓ Generated schema saved to create-schema-auto.sql');
console.log('\nPreview:');
console.log(fullSchema.substring(0, 1000) + '...');
