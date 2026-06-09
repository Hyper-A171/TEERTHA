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
    const duplicate = await db.templeCategory.findFirst({
      where: {
        slug,
        NOT: { id: catId }
      }
    });

    if (duplicate) {
      return NextResponse.json({ error: "Category slug must be unique" }, { status: 409 });
    }

    const updated = await db.templeCategory.update({
      where: { id: catId },
      data: { name, slug, description }
    });

    // Log action
    await db.activityLog.create({
      data: {
        user_id: parseInt((session.user as any).id),
        action: `Updated category: ${name}`
      }
    });

    return NextResponse.json(updated);
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

    const category = await db.templeCategory.findUnique({
      where: { id: catId }
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await db.templeCategory.delete({
      where: { id: catId }
    });

    // Log action
    await db.activityLog.create({
      data: {
        user_id: parseInt((session.user as any).id),
        action: `Deleted category: ${category.name}`
      }
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
