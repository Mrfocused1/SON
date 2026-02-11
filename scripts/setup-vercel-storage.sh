#!/bin/bash

# Get token from environment variable
VERCEL_TOKEN="${VERCEL_TOKEN:-}"
PROJECT_NAME="son"

if [ -z "$VERCEL_TOKEN" ]; then
  echo "Error: VERCEL_TOKEN environment variable not set"
  echo "Usage: VERCEL_TOKEN=your_token ./setup-vercel-storage.sh"
  exit 1
fi

echo "Setting up Vercel storage for project: $PROJECT_NAME"

# Create Postgres database
echo ""
echo "Creating Vercel Postgres database..."
POSTGRES_RESPONSE=$(curl -s -X POST "https://api.vercel.com/v1/storage/stores" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "postgres",
    "name": "son-database"
  }')

echo "Postgres creation response:"
echo "$POSTGRES_RESPONSE" | jq .

# Create Blob store
echo ""
echo "Creating Vercel Blob storage..."
BLOB_RESPONSE=$(curl -s -X POST "https://api.vercel.com/v1/storage/stores" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "blob",
    "name": "son-images"
  }')

echo "Blob creation response:"
echo "$BLOB_RESPONSE" | jq .

# Get project ID
echo ""
echo "Getting project ID..."
PROJECT_ID=$(curl -s "https://api.vercel.com/v9/projects/$PROJECT_NAME" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | jq -r '.id')

echo "Project ID: $PROJECT_ID"

# Link stores to project
if [ ! -z "$PROJECT_ID" ]; then
  echo ""
  echo "Linking storage to project..."

  POSTGRES_ID=$(echo "$POSTGRES_RESPONSE" | jq -r '.id')
  BLOB_ID=$(echo "$BLOB_RESPONSE" | jq -r '.id')

  if [ "$POSTGRES_ID" != "null" ]; then
    curl -s -X POST "https://api.vercel.com/v1/storage/stores/$POSTGRES_ID/link" \
      -H "Authorization: Bearer $VERCEL_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"projectId\": \"$PROJECT_ID\"}"
    echo "Postgres linked"
  fi

  if [ "$BLOB_ID" != "null" ]; then
    curl -s -X POST "https://api.vercel.com/v1/storage/stores/$BLOB_ID/link" \
      -H "Authorization: Bearer $VERCEL_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"projectId\": \"$PROJECT_ID\"}"
    echo "Blob linked"
  fi
fi

echo ""
echo "Storage setup complete!"
echo "Next: Add the environment variables to your Vercel project"
