import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/media/categories/[id]
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const catId = parseInt(resolvedParams.id);
    const { name, slug } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
    }

    // Check slug duplication
    const [duplicate] = await db.execute<any[]>('SELECT id FROM media_categories WHERE slug = ? AND id != ?', [slug, catId]);

    if (duplicate.length > 0) {
      return NextResponse.json({ error: "Category slug must be unique" }, { status: 409 });
    }

    await db.execute('UPDATE media_categories SET name = ?, slug = ? WHERE id = ?', [name, slug, catId]);

    return NextResponse.json({ id: catId, name, slug });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update media category" }, { status: 500 });
  }
}

// DELETE /api/admin/media/categories/[id]
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const catId = parseInt(resolvedParams.id);

    const [categoryRows] = await db.execute<any[]>('SELECT id FROM media_categories WHERE id = ?', [catId]);

    if (categoryRows.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await db.execute('DELETE FROM media_categories WHERE id = ?', [catId]);

    return NextResponse.json({ message: "Media category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete media category" }, { status: 500 });
  }
}
