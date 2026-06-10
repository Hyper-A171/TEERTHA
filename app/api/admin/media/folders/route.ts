import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

// GET all folders
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [folders] = await db.execute<any[]>('SELECT * FROM media_folders ORDER BY folder_name ASC');
    return NextResponse.json(folders);
  } catch (error) {
    console.error('Fetch folders error:', error);
    return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
  }
}

// POST create a new folder
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { folder_name, parent_folder } = await req.json();

    if (!folder_name) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    const parentId = parent_folder ? parseInt(parent_folder) : null;

    const [result] = await db.execute<any>(
      'INSERT INTO media_folders (folder_name, parent_folder) VALUES (?, ?)',
      [folder_name, parentId]
    );

    const createdFolder = {
      id: result.insertId,
      folder_name,
      parent_folder: parentId
    };

    // Log administrative action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Created media folder: ${folder_name}`]
    );

    return NextResponse.json(createdFolder, { status: 201 });
  } catch (error) {
    console.error('Create folder error:', error);
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
  }
}
