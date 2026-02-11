# Supabase to Vercel Migration Guide

## ✅ Completed Steps

1. **Data Export**: All 28 records from 12 Supabase tables exported to `migration-data/`
2. **Image Download**: All 17 images (61MB) downloaded to `migration-data/images/`
3. **Scripts Created**: Migration and upload scripts ready to use

---

## 📋 Next Steps

### Step 1: Create Vercel Postgres Database

1. Go to your Vercel dashboard: https://vercel.com/paulpauls-projects/son
2. Click on the **Storage** tab
3. Click **Create Database**
4. Select **Postgres** (powered by Neon)
5. Name it: `son-database`
6. Select your region (choose closest to your users)
7. Click **Create**

Once created, Vercel will automatically add these environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### Step 2: Create Database Schema

1. In the Vercel dashboard, go to your database
2. Click on the **Query** tab (or **.sql** tab)
3. Copy and paste the entire contents of `scripts/create-schema.sql`
4. Click **Run Query**
5. You should see "Query executed successfully"

Alternatively, pull the environment variables locally and run:
```bash
npx vercel env pull .env.local
node scripts/import-to-vercel-postgres.mjs
```

### Step 3: Import Data to Postgres

```bash
# Pull environment variables from Vercel
npx vercel env pull .env.local

# Run the import script
node scripts/import-to-vercel-postgres.mjs
```

This will import all your data into the new Vercel Postgres database.

### Step 4: Create Vercel Blob Storage

1. Back in your Vercel dashboard
2. Go to **Storage** tab
3. Click **Create Database** (or **Add Store**)
4. Select **Blob**
5. Name it: `son-images`
6. Click **Create**

Vercel will add:
- `BLOB_READ_WRITE_TOKEN`

### Step 5: Upload Images to Blob Storage

```bash
# Make sure .env.local has BLOB_READ_WRITE_TOKEN
npx vercel env pull .env.local

# Upload all images
node scripts/upload-to-vercel-blob.mjs
```

This uploads all 17 images and creates a URL mapping file.

### Step 6: Update Image URLs in Database

After uploading, update your database records to use the new Vercel Blob URLs:

```bash
node scripts/update-image-urls.mjs
```

This script will:
- Read the image URL mapping
- Update all image_url, logo_url, thumbnail_url, and icon_url fields
- Point them to the new Vercel Blob URLs

### Step 7: Update Your Codebase

Replace Supabase client with Vercel services:

1. **Remove Supabase dependencies** (optional, do this last):
   ```bash
   npm uninstall @supabase/supabase-js
   ```

2. **Update database queries** - Replace Supabase queries with Vercel Postgres:
   ```javascript
   // Old Supabase
   import { createClient } from '@supabase/supabase-js';
   const supabase = createClient(url, key);
   const { data } = await supabase.from('table').select();

   // New Vercel Postgres
   import { sql } from '@vercel/postgres';
   const { rows } = await sql`SELECT * FROM table`;
   ```

3. **Update image uploads** - Replace Supabase Storage with Vercel Blob:
   ```javascript
   // Old Supabase Storage
   const { data } = await supabase.storage.from('images').upload(path, file);

   // New Vercel Blob
   import { put } from '@vercel/blob';
   const blob = await put(filename, file, { access: 'public' });
   ```

### Step 8: Remove Old Environment Variables

Once everything is working with Vercel:

```bash
npx vercel env rm NEXT_PUBLIC_SUPABASE_URL
npx vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 📊 Migration Summary

### Exported Data

| Table | Records |
|-------|---------|
| home_content | 1 |
| capabilities | 0 |
| studio_images | 0 |
| gallery_images | 7 |
| shows | 1 |
| shows_content | 1 |
| roles | 6 |
| join_content | 1 |
| contact_content | 1 |
| navigation | 5 |
| social_links | 4 |
| site_settings | 1 |
| **Total** | **28** |

### Images

- Total: 17 images
- Size: 61 MB
- Location: `migration-data/images/`

---

## 🔧 Troubleshooting

### Connection Issues

If you get connection errors, make sure you've pulled the latest environment variables:
```bash
npx vercel env pull .env.local
```

### Import Failures

If data import fails:
1. Check the SQL schema was created successfully
2. Verify the JSON files in `migration-data/` are valid
3. Check the console output for specific error messages

### Image Upload Failures

If image uploads fail:
1. Verify `BLOB_READ_WRITE_TOKEN` is in your `.env.local`
2. Check that images exist in `migration-data/images/`
3. Try uploading one image at a time to identify issues

---

## ✅ Verification Checklist

- [ ] Vercel Postgres database created
- [ ] Schema created (12 tables)
- [ ] Data imported (28 records)
- [ ] Vercel Blob storage created
- [ ] Images uploaded (17 files)
- [ ] Image URLs updated in database
- [ ] Codebase updated to use Vercel services
- [ ] Application tested and working
- [ ] Old Supabase environment variables removed

---

## 📝 Notes

- All original data is preserved in `migration-data/`
- Keep this backup until you verify everything works
- You can safely delete the `migration-data/` folder after successful migration
- Your Supabase instance will remain untouched (you can delete it later)

---

## 🆘 Need Help?

If you encounter issues:
1. Check the error messages in the console
2. Verify all environment variables are set
3. Make sure you followed each step in order
4. Try running individual scripts to isolate the problem

Ready to proceed? Start with **Step 1: Create Vercel Postgres Database**!
