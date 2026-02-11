#!/bin/bash

# Supabase credentials
SUPABASE_URL="https://eotvqshhniktonzuqzpz.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdHZxc2hobmlrdG9uenVxenB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDAyMzk0MiwiZXhwIjoyMDc5NTk5OTQyfQ.8lgy_y7NwXE2ajvCHZv9e236fT4v1toM6vgIv1EkfQw"

# Create migration directory
MIGRATION_DIR="migration-data"
mkdir -p "$MIGRATION_DIR"

# Tables to export
TABLES=(
  "home_content"
  "capabilities"
  "studio_images"
  "gallery_images"
  "shows"
  "shows_content"
  "roles"
  "join_content"
  "contact_content"
  "navigation"
  "social_links"
  "site_settings"
)

echo "Starting Supabase data export..."
echo ""

# Export each table
for table in "${TABLES[@]}"; do
  echo "Exporting $table..."
  curl -s "${SUPABASE_URL}/rest/v1/${table}?select=*" \
    -H "apikey: ${SUPABASE_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_KEY}" \
    > "${MIGRATION_DIR}/${table}.json"

  if [ $? -eq 0 ]; then
    count=$(cat "${MIGRATION_DIR}/${table}.json" | jq '. | length' 2>/dev/null || echo "?")
    echo "✓ Exported $count rows from $table"
  else
    echo "✗ Failed to export $table"
  fi
done

# List all images from storage
echo ""
echo "Listing images from Supabase Storage..."
curl -s "${SUPABASE_URL}/storage/v1/object/list/images" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  > "${MIGRATION_DIR}/storage-images-list.json"

if [ $? -eq 0 ]; then
  count=$(cat "${MIGRATION_DIR}/storage-images-list.json" | jq '. | length' 2>/dev/null || echo "?")
  echo "✓ Found $count images in storage"
else
  echo "✗ Failed to list storage images"
fi

echo ""
echo "=== Export Complete ==="
echo "Data saved to: $MIGRATION_DIR/"
ls -lh "$MIGRATION_DIR/"
