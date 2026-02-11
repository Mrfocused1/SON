import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';

// Check if database is configured
export const isDatabaseConfigured = (): boolean => {
  return !!process.env.DATABASE_POSTGRES_URL || !!process.env.POSTGRES_URL;
};

// Helper functions for content management
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContent(table: string): Promise<any[]> {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured");
  }

  try {
    const { rows } = await sql.query(`SELECT * FROM ${table} ORDER BY created_at DESC`);
    return rows || [];
  } catch (error) {
    console.error(`Error fetching from ${table}:`, error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateContent(
  table: string,
  id: string,
  updates: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured");
  }

  const columns = Object.keys(updates);
  const values = Object.values(updates);

  // Build SET clause with quoted column names for reserved keywords
  const setClause = columns
    .map((col, idx) => {
      const quotedCol = col === 'order' ? `"order"` : col;
      return `${quotedCol} = $${idx + 1}`;
    })
    .join(', ');

  const query = `
    UPDATE ${table}
    SET ${setClause}, updated_at = NOW()
    WHERE id = $${columns.length + 1}
    RETURNING *
  `;

  try {
    const { rows } = await sql.query(query, [...values, id]);
    return rows[0];
  } catch (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createContent(
  table: string,
  content: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured");
  }

  const columns = Object.keys(content);
  const values = Object.values(content);

  // Quote column names for reserved keywords
  const quotedColumns = columns.map(col => col === 'order' ? `"order"` : col);
  const placeholders = columns.map((_, idx) => `$${idx + 1}`);

  const query = `
    INSERT INTO ${table} (${quotedColumns.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
  `;

  try {
    const { rows } = await sql.query(query, values);
    return rows[0];
  } catch (error) {
    console.error(`Error creating in ${table}:`, error);
    throw error;
  }
}

export async function deleteContent(table: string, id: string): Promise<void> {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured");
  }

  try {
    await sql.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
  } catch (error) {
    console.error(`Error deleting from ${table}:`, error);
    throw error;
  }
}

// Upload image to Vercel Blob Storage
export async function uploadImage(file: File): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Blob storage is not configured. Please add BLOB_READ_WRITE_TOKEN.");
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const blob = await put(fileName, file, {
      access: 'public',
      addRandomSuffix: false
    });

    return blob.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

// Backward compatibility exports
export const isSupabaseConfigured = isDatabaseConfigured;
