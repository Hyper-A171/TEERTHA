import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

// GET all media categories
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [categories] = await db.execute<any[]>('SELECT * FROM media_categories ORDER BY name ASC');
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media categories' }, { status: 500 });
  }
}

// POST new media category
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
    }

    // Check slug uniqueness
    const [duplicate] = await db.execute<any[]>('SELECT id FROM media_categories WHERE slug = ?', [slug]);
    if (duplicate.length > 0) {
      return NextResponse.json({ error: "Category slug must be unique" }, { status: 409 });
    }

    const [result] = await db.execute<any>('INSERT INTO media_categories (name, slug) VALUES (?, ?)', [name, slug]);

    return NextResponse.json({ id: result.insertId, name, slug }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create media category' }, { status: 500 });
  }
}
