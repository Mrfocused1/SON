import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for content management
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContent(table: string): Promise<any[]> {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw error;
  return data || [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateContent(table: string, id: string, updates: Record<string, any>): Promise<any> {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createContent(table: string, content: Record<string, any>): Promise<any> {
  const { data, error } = await supabase
    .from(table)
    .insert(content)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteContent(table: string, id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

// Upload image to Supabase Storage
export async function uploadImage(file: File, bucket: string = "images") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}
