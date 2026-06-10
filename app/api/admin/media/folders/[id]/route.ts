import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT rename folder
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const folderId = parseInt(resolvedParams.id);
    const { folder_name } = await req.json();

    if (!folder_name) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    // Check if folder exists
    const [exists] = await db.execute<any[]>('SELECT folder_name FROM media_folders WHERE id = ?', [folderId]);
    if (exists.length === 0) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    const oldName = exists[0].folder_name;

    await db.execute('UPDATE media_folders SET folder_name = ? WHERE id = ?', [folder_name, folderId]);

    // Log action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Renamed media folder from "${oldName}" to "${folder_name}"`]
    );

    return NextResponse.json({ id: folderId, folder_name });
  } catch (error) {
    console.error('Rename folder error:', error);
    return NextResponse.json({ error: 'Failed to rename folder' }, { status: 500 });
  }
}

// DELETE folder
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const folderId = parseInt(resolvedParams.id);

    // Check if folder exists
    const [exists] = await db.execute<any[]>('SELECT folder_name FROM media_folders WHERE id = ?', [folderId]);
    if (exists.length === 0) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    const folderName = exists[0].folder_name;

    // Delete folder (cascades subfolders, nullifies child media folder links)
    await db.execute('DELETE FROM media_folders WHERE id = ?', [folderId]);

    // Log deletion
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Deleted media folder "${folderName}" (nested items updated)`]
    );

    return NextResponse.json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error('Delete folder error:', error);
    return NextResponse.json({ error: 'Failed to delete folder' }, { status: 500 });
  }
}
