import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadImageUrlToGoogleDrive } from "@/lib/gdrive";

// GET all temples
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const temples = await db.temple.findMany({
      include: { category: true },
      orderBy: { name: "asc" }
    });
    return NextResponse.json(temples);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch temples" }, { status: 500 });
  }
}

// POST new temple
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug, description, location, thumbnail, category_id, status } = await req.json();

    if (!name || !slug || !description || !location || !thumbnail || !category_id) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await db.temple.findUnique({
      where: { slug }
    });

    if (existing) {
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

    const newTemple = await db.temple.create({
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
        action: `Created new temple profile: ${name}`
      }
    });

    return NextResponse.json(newTemple, { status: 201 });
  } catch (error) {
    console.error("Temple post error:", error);
    return NextResponse.json({ error: "Failed to create temple" }, { status: 500 });
  }
}
