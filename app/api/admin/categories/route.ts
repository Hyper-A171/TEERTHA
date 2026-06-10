import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET all categories
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [categories] = await db.execute<any[]>('SELECT * FROM temple_categories ORDER BY name ASC');
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST new category
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug, description } = await req.json();

    if (!name || !slug || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check slug uniqueness
    const [existing] = await db.execute<any[]>('SELECT id FROM temple_categories WHERE slug = ?', [slug]);

    if (existing.length > 0) {
      return NextResponse.json({ error: "Category slug must be unique" }, { status: 409 });
    }

    const [result] = await db.execute<any>(
      'INSERT INTO temple_categories (name, slug, description, created_at) VALUES (?, ?, ?, NOW())',
      [name, slug, description]
    );

    // Log action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Created new category: ${name}`]
    );

    return NextResponse.json({
      id: result.insertId,
      name, slug, description
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
