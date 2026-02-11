#!/bin/bash

set -e

echo "==========================================
Supabase to Vercel Migration Runner
=========================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
  echo ""
  echo "⚠️  No .env.local file found!"
  echo ""
  echo "You need to create Vercel Postgres and Blob storage first:"
  echo ""
  echo "1. Go to: https://vercel.com/paulpauls-projects/son/stores"
  echo "2. Click 'Create Database'"
  echo "3. Select 'Postgres' and name it 'son-database'"
  echo "4. Click 'Create' again and select 'Blob' and name it 'son-images'"
  echo ""
  echo "Then run:"
  echo "  npx vercel env pull .env.local"
  echo ""
  exit 1
fi

echo ""
echo "✓ Found .env.local"

# Check for required environment variables
echo "Checking environment variables..."

source .env.local

if [ -z "$POSTGRES_URL" ]; then
  echo "✗ POSTGRES_URL not found in .env.local"
  echo "Please create Vercel Postgres database first"
  exit 1
fi

if [ -z "$BLOB_READ_WRITE_TOKEN" ]; then
  echo "✗ BLOB_READ_WRITE_TOKEN not found in .env.local"
  echo "Please create Vercel Blob storage first"
  exit 1
fi

echo "✓ All environment variables found"

# Run the migration steps
echo ""
echo "==========================================
Step 1: Importing Data to Vercel Postgres
=========================================="
node scripts/import-to-vercel-postgres.mjs

echo ""
echo "==========================================
Step 2: Uploading Images to Vercel Blob
=========================================="
node scripts/upload-to-vercel-blob.mjs

echo ""
echo "==========================================
Step 3: Updating Image URLs in Database
=========================================="
node scripts/update-image-urls.mjs

echo ""
echo "=========================================="
echo "✅ Migration Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Test your application locally"
echo "2. Deploy to Vercel: npx vercel --prod"
echo "3. Remove old Supabase env vars:"
echo "   npx vercel env rm NEXT_PUBLIC_SUPABASE_URL"
echo "   npx vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""
