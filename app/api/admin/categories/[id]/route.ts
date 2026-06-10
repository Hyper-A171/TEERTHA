import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/categories/[id]
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const catId = parseInt(resolvedParams.id);
    const { name, slug, description } = await req.json();

    if (!name || !slug || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check slug duplication
    const [duplicate] = await db.execute<any[]>('SELECT id FROM temple_categories WHERE slug = ? AND id != ?', [slug, catId]);

    if (duplicate.length > 0) {
      return NextResponse.json({ error: "Category slug must be unique" }, { status: 409 });
    }

    await db.execute('UPDATE temple_categories SET name = ?, slug = ?, description = ? WHERE id = ?', [name, slug, description, catId]);

    // Log action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Updated category: ${name}`]
    );

    return NextResponse.json({ id: catId, name, slug, description });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// DELETE /api/admin/categories/[id]
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const catId = parseInt(resolvedParams.id);

    const [categoryRows] = await db.execute<any[]>('SELECT id, name FROM temple_categories WHERE id = ?', [catId]);

    if (categoryRows.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    const category = categoryRows[0];

    await db.execute('DELETE FROM temple_categories WHERE id = ?', [catId]);

    // Log action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Deleted category: ${category.name}`]
    );

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
