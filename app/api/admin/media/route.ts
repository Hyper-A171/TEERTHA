import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { uploadImageUrlToGoogleDrive } from '@/lib/gdrive';

// GET all media from all three tables
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch images
    const images = await db.templeImage.findMany({
      include: { temple: { select: { name: true } } },
      orderBy: { created_at: 'desc' }
    });

    // Fetch videos
    const videos = await db.templeVideo.findMany({
      include: {
        temple: { select: { name: true } },
        category: { select: { name: true } }
      },
      orderBy: { created_at: 'desc' }
    });

    // Fetch audio guides
    const audios = await db.templeAudioGuide.findMany({
      include: { temple: { select: { name: true } } },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({
      images,
      videos,
      audios
    });
  } catch (error) {
    console.error('Fetch media error:', error);
    return NextResponse.json({ error: 'Failed to fetch media library' }, { status: 500 });
  }
}

// POST register a new media item (e.g. image, video, audio)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, temple_id, url, title, video_type, duration, category_id, language } = await req.json();

    if (!temple_id || !url) {
      return NextResponse.json({ error: "Temple ID and URL are required" }, { status: 400 });
    }

    const templeIdInt = parseInt(temple_id);

    // Validate temple existence
    const temple = await db.temple.findUnique({
      where: { id: templeIdInt }
    });
    if (!temple) {
      return NextResponse.json({ error: "Target temple not found" }, { status: 404 });
    }

    let createdRecord;

    if (type === 'image') {
      if (!title) {
        return NextResponse.json({ error: "Image title is required" }, { status: 400 });
      }
      let driveImage;
      try {
        driveImage = await uploadImageUrlToGoogleDrive(url);
      } catch (driveError: any) {
        return NextResponse.json({
          error: `Failed to save image to Google Drive: ${driveError.message || driveError}`
        }, { status: 500 });
      }
      createdRecord = await db.templeImage.create({
        data: {
          temple_id: templeIdInt,
          image_url: driveImage.url,
          title: title
        }
      });
    } else if (type === 'video') {
      if (!video_type) {
        return NextResponse.json({ error: "Video type (Standard/360_VR) is required" }, { status: 400 });
      }
      createdRecord = await db.templeVideo.create({
        data: {
          temple_id: templeIdInt,
          video_url: url,
          video_type: video_type,
          duration: parseInt(duration || 0),
          category_id: category_id ? parseInt(category_id) : null
        }
      });
    } else if (type === 'audio') {
      if (!language) {
        return NextResponse.json({ error: "Audio language selection is required" }, { status: 400 });
      }
      createdRecord = await db.templeAudioGuide.create({
        data: {
          temple_id: templeIdInt,
          audio_url: url,
          language: language
        }
      });
    } else {
      return NextResponse.json({ error: "Invalid media classification type" }, { status: 400 });
    }

    // Log administrative action
    await db.activityLog.create({
      data: {
        user_id: parseInt((session.user as any).id),
        action: `Linked new ${type} media asset to Temple: ${temple.name}`
      }
    });

    return NextResponse.json(createdRecord, { status: 201 });
  } catch (error) {
    console.error('Create media error:', error);
    return NextResponse.json({ error: 'Failed to create media register' }, { status: 500 });
  }
}
