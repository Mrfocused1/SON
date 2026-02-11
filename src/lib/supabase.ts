// Client-side compatibility wrapper for Vercel Postgres/Blob
// Uses API routes to fetch data

class ClientPostgresClient {
  from(table: string) {
    return {
      select: (_columns = '*') => {
        const query: any = {
          single: async () => {
            try {
              const res = await fetch(`/api/content/${table}`);
              const json = await res.json();
              return { data: json.data?.[0] || null, error: json.error };
            } catch (error) {
              return { data: null, error };
            }
          },
          order: async (_column: string, _options?: { ascending?: boolean }) => {
            try {
              const res = await fetch(`/api/content/${table}`);
              const json = await res.json();
              return { data: json.data, error: json.error };
            } catch (error) {
              return { data: null, error };
            }
          },
          then: (onfulfilled: any) => {
            return fetch(`/api/content/${table}`)
              .then(res => res.json())
              .then(json => onfulfilled({ data: json.data, error: json.error }))
              .catch(error => onfulfilled({ data: null, error }));
          }
        };
        return query;
      }
    };
  }
}

export const supabase = new ClientPostgresClient();
export const isSupabaseConfigured = () => true;

// These are just placeholders - admin should import from ./db instead
export const getContent = async () => { throw new Error('Use import from ./db'); };
export const updateContent = async () => { throw new Error('Use import from ./db'); };
export const createContent = async () => { throw new Error('Use import from ./db'); };
export const deleteContent = async () => { throw new Error('Use import from ./db'); };
export const uploadImage = async (file: File, _bucket?: string): Promise<string> => {
  // Import dynamically to avoid bundling server code
  const { uploadImage: serverUploadImage } = await import('./db');
  return serverUploadImage(file);
};
