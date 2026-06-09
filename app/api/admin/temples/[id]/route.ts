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
    const duplicate = await db.temple.findFirst({
      where: {
        slug,
        NOT: { id: templeId }
      }
    });

    if (duplicate) {
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

    const updated = await db.temple.update({
      where: { id: templeId },
      data: {
        name,
        slug,
        description,
        location,
        thumbnail: driveThumbnail.url,
        category_id: parseInt(category_id),
        status: status || "Active"
      }
    });

    // Log action
    await db.activityLog.create({
      data: {
        user_id: parseInt((session.user as any).id),
        action: `Updated temple profile: ${name}`
      }
    });

    return NextResponse.json(updated);
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

    const temple = await db.temple.findUnique({
      where: { id: templeId }
    });

    if (!temple) {
      return NextResponse.json({ error: "Temple profile not found" }, { status: 404 });
    }

    await db.temple.delete({
      where: { id: templeId }
    });

    // Log action
    await db.activityLog.create({
      data: {
        user_id: parseInt((session.user as any).id),
        action: `Deleted temple profile: ${temple.name}`
      }
    });

    return NextResponse.json({ message: "Temple deleted successfully" });
  } catch (error) {
    console.error("Temple delete error:", error);
    return NextResponse.json({ error: "Failed to delete temple" }, { status: 500 });
  }
}
