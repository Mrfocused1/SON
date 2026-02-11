import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createSchema() {
  console.log('Creating database schema...\n');

  const connectionString = process.env.DATABASE_POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error('No connection string found. Please set DATABASE_POSTGRES_URL_NON_POOLING or POSTGRES_URL');
  }

  // Parse connection string and add SSL config
  const config = {
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : { rejectUnauthorized: false }
  };

  const client = new Client(config);
  await client.connect();

  const schemaSQL = fs.readFileSync(
    path.join(__dirname, 'create-schema-auto.sql'),
    'utf-8'
  );

  // Remove comments and split by semicolons
  const cleaned = schemaSQL
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');

  const statements = cleaned
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  console.log(`Found ${statements.length} SQL statements to execute\n`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    try {
      await client.query(statement);
      // Extract table name for logging
      const match = statement.match(/CREATE TABLE.*?(\w+)\s*\(/i);
      if (match) {
        console.log(`✓ Created table: ${match[1]}`);
      } else if (statement.includes('CREATE INDEX')) {
        const indexMatch = statement.match(/CREATE INDEX.*?(\w+)/i);
        if (indexMatch) {
          console.log(`✓ Created index: ${indexMatch[1]}`);
        }
      }
    } catch (error) {
      if (error.message.includes('already exists')) {
        const match = statement.match(/CREATE (?:TABLE|INDEX).*?(\w+)/i);
        if (match) {
          console.log(`⚠️  ${match[1]} already exists, skipping...`);
        }
      } else {
        console.error(`✗ Error:`, error.message);
        console.error(`Statement (${i+1}/${statements.length}):`, statement.substring(0, 150) + '...');
      }
    }
  }

  await client.end();
  console.log('\n✓ Schema creation complete!');
}

async function main() {
  try {
    await createSchema();
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

main();
