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

    const [temples] = await db.execute<any[]>(
      `SELECT t.*, c.name as category_name, c.slug as category_slug, c.description as category_description 
       FROM temples t 
       LEFT JOIN temple_categories c ON t.category_id = c.id 
       ORDER BY t.name ASC`
    );
    
    const formattedTemples = temples.map(t => ({
      ...t,
      category: t.category_id ? {
        id: t.category_id,
        name: t.category_name,
        slug: t.category_slug,
        description: t.category_description
      } : null
    }));

    return NextResponse.json(formattedTemples);
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
    const [existing] = await db.execute<any[]>('SELECT id FROM temples WHERE slug = ?', [slug]);

    if (existing.length > 0) {
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
    const [result] = await db.execute<any>(
      `INSERT INTO temples (name, slug, description, location, thumbnail, category_id, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [name, slug, description, location, driveThumbnail.url, parsedCategoryId, resolvedStatus]
    );

    // Log action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Created new temple profile: ${name}`]
    );

    return NextResponse.json({
      id: result.insertId,
      name, slug, description, location, 
      thumbnail: driveThumbnail.url, 
      category_id: parsedCategoryId, 
      status: resolvedStatus
    }, { status: 201 });
  } catch (error) {
    console.error("Temple post error:", error);
    return NextResponse.json({ error: "Failed to create temple" }, { status: 500 });
  }
}
