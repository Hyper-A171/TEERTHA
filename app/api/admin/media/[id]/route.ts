import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/media/[id]
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const mediaId = parseInt(resolvedParams.id);
    const body = await req.json();

    const {
      title,
      temple_id,
      category_id,
      folder_id,
      video_type,
      duration,
      language
    } = body;

    // Check if media exists
    const [exists] = await db.execute<any[]>('SELECT id FROM media WHERE id = ?', [mediaId]);
    if (exists.length === 0) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 });
    }

    const finalFolderId = folder_id ? parseInt(folder_id) : null;
    const finalCategoryId = category_id ? parseInt(category_id) : null;
    const finalTempleId = temple_id ? parseInt(temple_id) : null;
    const finalDuration = duration ? parseInt(duration) : null;

    let updateSql = `
      UPDATE media 
      SET updated_at = NOW()
    `;
    const updateParams: any[] = [];

    if (title !== undefined) {
      updateSql += ', title = ?';
      updateParams.push(title);
    }
    if (finalTempleId !== null && finalTempleId !== undefined) {
      updateSql += ', temple_id = ?';
      updateParams.push(finalTempleId);
    }
    if (category_id !== undefined) {
      updateSql += ', category_id = ?';
      updateParams.push(finalCategoryId);
    }
    if (folder_id !== undefined) {
      updateSql += ', folder_id = ?';
      updateParams.push(finalFolderId);
    }
    if (video_type !== undefined) {
      updateSql += ', video_type = ?';
      updateParams.push(video_type);
    }
    if (duration !== undefined) {
      updateSql += ', duration = ?';
      updateParams.push(finalDuration);
    }
    if (language !== undefined) {
      updateSql += ', language = ?';
      updateParams.push(language);
    }

    updateSql += ' WHERE id = ?';
    updateParams.push(mediaId);

    await db.execute(updateSql, updateParams);

    return NextResponse.json({ id: mediaId, message: "Media updated successfully" });
  } catch (error) {
    console.error('Update media error:', error);
    return NextResponse.json({ error: 'Failed to update media item' }, { status: 500 });
  }
}

// DELETE /api/admin/media/[id]
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const permanent = searchParams.get('permanent') === 'true';

    const resolvedParams = await params;
    const mediaId = parseInt(resolvedParams.id);

    // Check if media exists
    const [exists] = await db.execute<any[]>('SELECT title FROM media WHERE id = ?', [mediaId]);
    if (exists.length === 0) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 });
    }

    const title = exists[0].title;

    if (permanent) {
      await db.execute('DELETE FROM media WHERE id = ?', [mediaId]);
      await db.execute(
        'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
        [parseInt((session.user as any).id), `Permanently deleted media asset: "${title}"`]
      );
    } else {
      await db.execute('UPDATE media SET deleted_at = NOW() WHERE id = ?', [mediaId]);
      await db.execute(
        'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
        [parseInt((session.user as any).id), `Soft deleted media asset: "${title}"`]
      );
    }

    return NextResponse.json({ message: "Media deleted successfully", permanent });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ error: 'Failed to delete media asset' }, { status: 500 });
  }
}

// PATCH /api/admin/media/[id] (For restoring soft-deleted media)
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const mediaId = parseInt(resolvedParams.id);

    // Check if media exists
    const [exists] = await db.execute<any[]>('SELECT title FROM media WHERE id = ?', [mediaId]);
    if (exists.length === 0) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 });
    }

    const title = exists[0].title;

    await db.execute('UPDATE media SET deleted_at = NULL WHERE id = ?', [mediaId]);

    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Restored media asset: "${title}"`]
    );

    return NextResponse.json({ message: "Media restored successfully" });
  } catch (error) {
    console.error('Restore media error:', error);
    return NextResponse.json({ error: 'Failed to restore media asset' }, { status: 500 });
  }
}
