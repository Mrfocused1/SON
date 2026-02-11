#!/bin/bash

MIGRATION_DIR="migration-data"
IMAGES_DIR="${MIGRATION_DIR}/images"
mkdir -p "$IMAGES_DIR"

echo "Extracting image URLs from exported data..."

# Function to extract URLs from JSON files
extract_urls() {
  local file=$1
  if [ -f "$file" ]; then
    # Extract all URLs that contain supabase.co/storage
    grep -o 'https://eotvqshhniktonzuqzpz.supabase.co/storage/v1/object/public/images/[^"]*' "$file" || true
  fi
}

# Find all unique image URLs
ALL_URLS=""
for file in ${MIGRATION_DIR}/*.json; do
  urls=$(extract_urls "$file")
  if [ -n "$urls" ]; then
    ALL_URLS="${ALL_URLS}${urls}"$'\n'
  fi
done

# Remove duplicates and save to file
UNIQUE_URLS=$(echo "$ALL_URLS" | sort -u | grep -v '^$')
echo "$UNIQUE_URLS" > "${MIGRATION_DIR}/image-urls.txt"

# Count URLs
URL_COUNT=$(echo "$UNIQUE_URLS" | grep -c .)
echo "Found $URL_COUNT unique images to download"
echo ""

# Download each image
counter=0
while IFS= read -r url; do
  if [ -n "$url" ]; then
    # Extract filename from URL
    filename=$(basename "$url")
    ((counter++))

    echo "[$counter/$URL_COUNT] Downloading $filename..."
    curl -s "$url" -o "${IMAGES_DIR}/${filename}"

    if [ $? -eq 0 ]; then
      size=$(ls -lh "${IMAGES_DIR}/${filename}" | awk '{print $5}')
      echo "  ✓ Downloaded ($size)"
    else
      echo "  ✗ Failed"
    fi
  fi
done <<< "$UNIQUE_URLS"

echo ""
echo "=== Download Complete ==="
echo "Images saved to: $IMAGES_DIR/"
ls -lh "$IMAGES_DIR/" | tail -n +2 | wc -l | xargs echo "Total images:"
du -sh "$IMAGES_DIR/" | awk '{print "Total size: " $1}'
