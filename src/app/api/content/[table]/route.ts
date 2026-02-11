import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  // Whitelist allowed tables for security
  const allowedTables = [
    'home_content',
    'capabilities',
    'studio_images',
    'gallery_images',
    'shows',
    'shows_content',
    'roles',
    'join_content',
    'contact_content',
    'navigation',
    'social_links',
    'site_settings'
  ];

  if (!allowedTables.includes(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  try {
    // Handle ordering for tables with an "order" column
    const tablesWithOrder = ['gallery_images', 'shows', 'roles', 'navigation', 'social_links', 'capabilities'];

    let query;
    if (tablesWithOrder.includes(table)) {
      query = `SELECT * FROM ${table} ORDER BY "order" ASC`;
    } else {
      query = `SELECT * FROM ${table} ORDER BY created_at DESC`;
    }

    const { rows } = await sql.query(query);
    return NextResponse.json({ data: rows, error: null });
  } catch (error) {
    console.error(`Error fetching from ${table}:`, error);
    return NextResponse.json({ data: null, error: error }, { status: 500 });
  }
}
