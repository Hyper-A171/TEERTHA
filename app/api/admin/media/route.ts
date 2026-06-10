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
    const [images] = await db.execute<any[]>(
      `SELECT i.*, t.name as temple_name 
       FROM temple_images i 
       JOIN temples t ON i.temple_id = t.id 
       ORDER BY i.created_at DESC`
    );

    // Fetch videos
    const [videos] = await db.execute<any[]>(
      `SELECT v.*, t.name as temple_name, c.name as category_name 
       FROM temple_videos v 
       JOIN temples t ON v.temple_id = t.id 
       LEFT JOIN media_categories c ON v.category_id = c.id 
       ORDER BY v.created_at DESC`
    );

    // Fetch audio guides
    const [audios] = await db.execute<any[]>(
      `SELECT a.*, t.name as temple_name 
       FROM temple_audio_guides a 
       JOIN temples t ON a.temple_id = t.id 
       ORDER BY a.created_at DESC`
    );

    const formatTemple = (item: any) => ({ ...item, temple: { name: item.temple_name } });
    const formatVideo = (item: any) => ({
      ...item,
      temple: { name: item.temple_name },
      category: item.category_name ? { name: item.category_name } : null
    });

    return NextResponse.json({
      images: images.map(formatTemple),
      videos: videos.map(formatVideo),
      audios: audios.map(formatTemple)
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
    const [templeRows] = await db.execute<any[]>('SELECT id, name FROM temples WHERE id = ?', [templeIdInt]);
    if (templeRows.length === 0) {
      return NextResponse.json({ error: "Target temple not found" }, { status: 404 });
    }
    const temple = templeRows[0];

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
      const [res] = await db.execute<any>(
        'INSERT INTO temple_images (temple_id, image_url, title, created_at) VALUES (?, ?, ?, NOW())',
        [templeIdInt, driveImage.url, title]
      );
      createdRecord = { id: res.insertId, temple_id: templeIdInt, image_url: driveImage.url, title };
    } else if (type === 'video') {
      if (!video_type) {
        return NextResponse.json({ error: "Video type (Standard/360_VR) is required" }, { status: 400 });
      }
      const [res] = await db.execute<any>(
        'INSERT INTO temple_videos (temple_id, video_url, video_type, duration, category_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [templeIdInt, url, video_type, parseInt(duration || 0), category_id ? parseInt(category_id) : null]
      );
      createdRecord = { id: res.insertId, temple_id: templeIdInt, video_url: url, video_type, duration: parseInt(duration || 0), category_id: category_id ? parseInt(category_id) : null };
    } else if (type === 'audio') {
      if (!language) {
        return NextResponse.json({ error: "Audio language selection is required" }, { status: 400 });
      }
      const [res] = await db.execute<any>(
        'INSERT INTO temple_audio_guides (temple_id, audio_url, language, created_at) VALUES (?, ?, ?, NOW())',
        [templeIdInt, url, language]
      );
      createdRecord = { id: res.insertId, temple_id: templeIdInt, audio_url: url, language };
    } else {
      return NextResponse.json({ error: "Invalid media classification type" }, { status: 400 });
    }

    // Log administrative action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Linked new ${type} media asset to Temple: ${temple.name}`]
    );

    return NextResponse.json(createdRecord, { status: 201 });
  } catch (error) {
    console.error('Create media error:', error);
    return NextResponse.json({ error: 'Failed to create media register' }, { status: 500 });
  }
}
