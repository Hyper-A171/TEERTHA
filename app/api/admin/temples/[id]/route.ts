import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadImageUrlToGoogleDrive } from "@/lib/gdrive";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/temples/[id]
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const templeId = parseInt(resolvedParams.id);
    const { name, slug, description, location, thumbnail, category_id, status } = await req.json();

    if (!name || !slug || !description || !location || !thumbnail || !category_id) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check slug duplication
    const [duplicate] = await db.execute<any[]>('SELECT id FROM temples WHERE slug = ? AND id != ?', [slug, templeId]);

    if (duplicate.length > 0) {
      return NextResponse.json({ error: "Temple slug must be unique" }, { status: 409 });
    }

    let driveThumbnail;
    try {
      driveThumbnail = await uploadImageUrlToGoogleDrive(thumbnail);
    } catch (driveError: any) {
      return NextResponse.json({
        error: `Failed to save thumbnail to Google Drive: ${driveError.message || driveError}`
      }, { status: 500 });
    }

    const parsedCategoryId = parseInt(category_id);
    const resolvedStatus = status || "Active";
    await db.execute(
      `UPDATE temples SET name = ?, slug = ?, description = ?, location = ?, thumbnail = ?, category_id = ?, status = ? WHERE id = ?`,
      [name, slug, description, location, driveThumbnail.url, parsedCategoryId, resolvedStatus, templeId]
    );

    // Log action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Updated temple profile: ${name}`]
    );

    return NextResponse.json({
      id: templeId,
      name, slug, description, location, 
      thumbnail: driveThumbnail.url, 
      category_id: parsedCategoryId, 
      status: resolvedStatus
    });
  } catch (error) {
    console.error("Temple put error:", error);
    return NextResponse.json({ error: "Failed to update temple" }, { status: 500 });
  }
}

// DELETE /api/admin/temples/[id]
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const templeId = parseInt(resolvedParams.id);

    const [templeRows] = await db.execute<any[]>('SELECT id, name FROM temples WHERE id = ?', [templeId]);

    if (templeRows.length === 0) {
      return NextResponse.json({ error: "Temple profile not found" }, { status: 404 });
    }
    const temple = templeRows[0];

    await db.execute('DELETE FROM temples WHERE id = ?', [templeId]);

    // Log action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Deleted temple profile: ${temple.name}`]
    );

    return NextResponse.json({ message: "Temple deleted successfully" });
  } catch (error) {
    console.error("Temple delete error:", error);
    return NextResponse.json({ error: "Failed to delete temple" }, { status: 500 });
  }
}
