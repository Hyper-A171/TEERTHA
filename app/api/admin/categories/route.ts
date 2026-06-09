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

    const categories = await db.templeCategory.findMany({
      orderBy: { name: "asc" }
    });
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
    const existing = await db.templeCategory.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json({ error: "Category slug must be unique" }, { status: 409 });
    }

    const newCategory = await db.templeCategory.create({
      data: { name, slug, description }
    });

    // Log action
    await db.activityLog.create({
      data: {
        user_id: parseInt((session.user as any).id),
        action: `Created new category: ${name}`
      }
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
