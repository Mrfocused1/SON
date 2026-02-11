import pkg from 'pg';
const { Client } = pkg;

const connectionString = process.env.DATABASE_POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error('DATABASE_POSTGRES_URL_NON_POOLING not set');
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

await client.connect();

console.log('Checking image URLs in production database...\n');

// Check home_content
const home = await client.query('SELECT hero_background_image, featured_video_thumbnail FROM home_content LIMIT 1');
console.log('Home content images:');
console.log(home.rows[0]);
console.log('');

// Check gallery_images
const gallery = await client.query('SELECT id, image_url FROM gallery_images LIMIT 3');
console.log('Gallery images:');
gallery.rows.forEach(row => console.log(`- ${row.image_url}`));
console.log('');

// Check shows
const shows = await client.query('SELECT id, thumbnail FROM shows LIMIT 3');
console.log('Shows images:');
shows.rows.forEach(row => console.log(`- ${row.thumbnail}`));
console.log('');

// Check site_settings
const settings = await client.query('SELECT logo_url FROM site_settings LIMIT 1');
console.log('Logo:');
console.log(settings.rows[0]);

await client.end();
