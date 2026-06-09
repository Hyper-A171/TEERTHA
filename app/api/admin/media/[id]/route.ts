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
      updatedRecord = await db.templeImage.update({
        where: { id: mediaId },
        data: { title }
      });
    } else if (type === 'video') {
      const { video_type, duration, category_id } = body;
      updatedRecord = await db.templeVideo.update({
        where: { id: mediaId },
        data: {
          video_type,
          duration: parseInt(duration || 0),
          category_id: category_id ? parseInt(category_id) : null
        }
      });
    } else if (type === 'audio') {
      const { language } = body;
      updatedRecord = await db.templeAudioGuide.update({
        where: { id: mediaId },
        data: { language }
      });
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
      await db.templeImage.delete({ where: { id: mediaId } });
    } else if (type === 'video') {
      await db.templeVideo.delete({ where: { id: mediaId } });
    } else if (type === 'audio') {
      await db.templeAudioGuide.delete({ where: { id: mediaId } });
    } else {
      return NextResponse.json({ error: "Invalid media type query param" }, { status: 400 });
    }

    // Log deletion
    await db.activityLog.create({
      data: {
        user_id: parseInt((session.user as any).id),
        action: `Unlinked and deleted ${type} asset ID: ${mediaId}`
      }
    });

    return NextResponse.json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ error: 'Failed to delete media asset' }, { status: 500 });
  }
}
