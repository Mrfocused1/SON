// Backward compatibility wrapper for Vercel Postgres/Blob
// This file maintains the same API as the old Supabase client
// but uses Vercel Postgres and Vercel Blob under the hood

import { sql } from '@vercel/postgres';
import {
  getContent,
  updateContent,
  createContent,
  deleteContent,
  uploadImage as uploadImageToBlob,
  isDatabaseConfigured,
} from './db';

// Supabase-like client for backward compatibility
class PostgresClient {
  from(table: string) {
    return {
      select: (columns = '*') => {
        const baseQuery = () => sql.query(`SELECT ${columns} FROM ${table} ORDER BY created_at DESC`);

        // Create a proper thenable/Promise-like object
        const query: any = {
          single: () => {
            return sql.query(`SELECT ${columns} FROM ${table} LIMIT 1`)
              .then(({ rows }) => ({ data: rows[0] || null, error: null }))
              .catch((error) => ({ data: null, error }));
          },
          order: (column: string, options?: { ascending?: boolean }) => {
            const direction = options?.ascending ? 'ASC' : 'DESC';
            const quotedCol = column === 'order' ? `"order"` : column;
            return sql.query(`SELECT ${columns} FROM ${table} ORDER BY ${quotedCol} ${direction}`)
              .then(({ rows }) => ({ data: rows, error: null }))
              .catch((error) => ({ data: null, error }));
          },
          then: (onfulfilled: any, onrejected: any) => {
            return baseQuery()
              .then(({ rows }) => onfulfilled({ data: rows, error: null }))
              .catch((error) => onrejected ? onrejected(error) : ({ data: null, error }));
          },
          catch: (onrejected: any) => {
            return baseQuery()
              .then(({ rows }) => ({ data: rows, error: null }))
              .catch((error) => onrejected(error));
          }
        };

        return query;
      },

      insert: async (data: any | any[]) => {
        try {
          const records = Array.isArray(data) ? data : [data];
          const inserted = [];

          for (const record of records) {
            const columns = Object.keys(record);
            const values = Object.values(record);
            const quotedColumns = columns.map(col => col === 'order' ? `"order"` : col);
            const placeholders = columns.map((_, idx) => `$${idx + 1}`);

            const query = `
              INSERT INTO ${table} (${quotedColumns.join(', ')})
              VALUES (${placeholders.join(', ')})
              RETURNING *
            `;

            const { rows } = await sql.query(query, values);
            inserted.push(rows[0]);
          }

          return { data: inserted.length === 1 ? inserted[0] : inserted, error: null };
        } catch (error) {
          return { data: null, error };
        }
      },

      update: (updates: Record<string, any>) => {
        return {
          eq: (column: string, value: any) => {
            const columns = Object.keys(updates);
            const values = Object.values(updates);
            const setClause = columns
              .map((col, idx) => {
                const quotedCol = col === 'order' ? `"order"` : col;
                return `${quotedCol} = $${idx + 1}`;
              })
              .join(', ');

            const query = `
              UPDATE ${table}
              SET ${setClause}, updated_at = NOW()
              WHERE ${column} = $${columns.length + 1}
              RETURNING *
            `;

            // Return a chainable object that's also a Promise
            const updatePromise: any = sql.query(query, [...values, value])
              .then(({ rows }) => ({ data: rows[0], error: null }))
              .catch((error) => ({ data: null, error }));

            // Add select() for chaining
            updatePromise.select = () => ({
              single: () => updatePromise
            });

            return updatePromise;
          }
        };
      },

      delete: () => {
        return {
          neq: async (column: string, value: any) => {
            try {
              await sql.query(`DELETE FROM ${table} WHERE ${column} != $1`, [value]);
              return { error: null };
            } catch (error) {
              return { error };
            }
          },
          eq: async (column: string, value: any) => {
            try {
              await sql.query(`DELETE FROM ${table} WHERE ${column} = $1`, [value]);
              return { error: null };
            } catch (error) {
              return { error };
            }
          }
        };
      },

      order: (column: string, options?: { ascending?: boolean }) => {
        const direction = options?.ascending ? 'ASC' : 'DESC';
        const quotedCol = column === 'order' ? `"order"` : column;
        return {
          select: async (columns = '*') => {
            try {
              const { rows } = await sql.query(
                `SELECT ${columns} FROM ${table} ORDER BY ${quotedCol} ${direction}`
              );
              return { data: rows, error: null };
            } catch (error) {
              return { data: null, error };
            }
          }
        };
      }
    };
  }
}

// Mock supabase client for backward compatibility
export const supabase = isDatabaseConfigured() ? new PostgresClient() : null;

// Check if database is configured
export const isSupabaseConfigured = isDatabaseConfigured;

// Re-export all functions with the same API
export { getContent, updateContent, createContent, deleteContent };

// Upload image wrapper (bucket parameter ignored, kept for compatibility)
export async function uploadImage(file: File, _bucket?: string): Promise<string> {
  return uploadImageToBlob(file);
}
