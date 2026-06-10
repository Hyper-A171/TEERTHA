import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/media/[id]?type=...
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // "image", "video", "audio"

    const resolvedParams = await params;
    const mediaId = parseInt(resolvedParams.id);
    const body = await req.json();

    let updatedRecord;

    if (type === 'image') {
      const { title } = body;
      await db.execute('UPDATE temple_images SET title = ? WHERE id = ?', [title, mediaId]);
      updatedRecord = { id: mediaId, title };
    } else if (type === 'video') {
      const { video_type, duration, category_id } = body;
      await db.execute(
        'UPDATE temple_videos SET video_type = ?, duration = ?, category_id = ? WHERE id = ?',
        [video_type, parseInt(duration || 0), category_id ? parseInt(category_id) : null, mediaId]
      );
      updatedRecord = { id: mediaId, video_type, duration: parseInt(duration || 0), category_id: category_id ? parseInt(category_id) : null };
    } else if (type === 'audio') {
      const { language } = body;
      await db.execute('UPDATE temple_audio_guides SET language = ? WHERE id = ?', [language, mediaId]);
      updatedRecord = { id: mediaId, language };
    } else {
      return NextResponse.json({ error: "Invalid media classification type" }, { status: 400 });
    }

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Update media error:', error);
    return NextResponse.json({ error: 'Failed to update media item' }, { status: 500 });
  }
}

// DELETE /api/admin/media/[id]?type=...
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // "image", "video", "audio"

    const resolvedParams = await params;
    const mediaId = parseInt(resolvedParams.id);

    if (type === 'image') {
      await db.execute('DELETE FROM temple_images WHERE id = ?', [mediaId]);
    } else if (type === 'video') {
      await db.execute('DELETE FROM temple_videos WHERE id = ?', [mediaId]);
    } else if (type === 'audio') {
      await db.execute('DELETE FROM temple_audio_guides WHERE id = ?', [mediaId]);
    } else {
      return NextResponse.json({ error: "Invalid media type query param" }, { status: 400 });
    }

    // Log deletion
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Unlinked and deleted ${type} asset ID: ${mediaId}`]
    );

    return NextResponse.json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ error: 'Failed to delete media asset' }, { status: 500 });
  }
}
