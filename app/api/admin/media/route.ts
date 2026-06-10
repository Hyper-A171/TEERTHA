import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { uploadImageUrlToGoogleDrive } from '@/lib/gdrive';

// GET all media items
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const templeId = searchParams.get('temple_id');
    const categoryId = searchParams.get('category_id');
    const folderId = searchParams.get('folder_id');
    const trash = searchParams.get('trash') === 'true';

    let sql = `
      SELECT m.*, t.name as temple_name, c.name as category_name, f.folder_name 
      FROM media m
      JOIN temples t ON m.temple_id = t.id
      LEFT JOIN media_categories c ON m.category_id = c.id
      LEFT JOIN media_folders f ON m.folder_id = f.id
    `;

    const whereClauses: string[] = [];
    const params: any[] = [];

    // Trash filter (soft delete)
    if (trash) {
      whereClauses.push('m.deleted_at IS NOT NULL');
    } else {
      whereClauses.push('m.deleted_at IS NULL');
    }

    // Temple filter
    if (templeId) {
      whereClauses.push('m.temple_id = ?');
      params.push(parseInt(templeId));
    }

    // Category filter
    if (categoryId) {
      whereClauses.push('m.category_id = ?');
      params.push(parseInt(categoryId));
    }

    // Folder filter
    if (folderId === 'root') {
      whereClauses.push('m.folder_id IS NULL');
    } else if (folderId) {
      whereClauses.push('m.folder_id = ?');
      params.push(parseInt(folderId));
    }

    if (whereClauses.length > 0) {
      sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    sql += ' ORDER BY m.created_at DESC';

    const [rows] = await db.execute<any[]>(sql, params);

    const formatMedia = (item: any) => ({
      ...item,
      temple: { name: item.temple_name },
      category: item.category_name ? { name: item.category_name } : null,
      folder: item.folder_name ? { folder_name: item.folder_name } : null
    });

    const formatted = rows.map(formatMedia);

    // Grouping by type for backward compatibility
    const images = formatted.filter(item => item.mime_type.startsWith('image/'));
    const videos = formatted.filter(item => item.mime_type.startsWith('video/'));
    const audios = formatted.filter(item => item.mime_type.startsWith('audio/'));
    const documents = formatted.filter(item => 
      !item.mime_type.startsWith('image/') && 
      !item.mime_type.startsWith('video/') && 
      !item.mime_type.startsWith('audio/')
    );

    return NextResponse.json({
      images,
      videos,
      audios,
      documents,
      all: formatted
    });
  } catch (error) {
    console.error('Fetch media error:', error);
    return NextResponse.json({ error: 'Failed to fetch media library' }, { status: 500 });
  }
}

// POST register a new media item
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      type, // "image", "video", "audio", "document" (for remote link creation helper)
      temple_id,
      url,
      title,
      video_type,
      duration,
      category_id,
      language,
      file_name,
      mime_type,
      file_size,
      file_id,
      folder_id
    } = await req.json();

    if (!temple_id || !url) {
      return NextResponse.json({ error: "Temple ID and URL are required" }, { status: 400 });
    }

    const templeIdInt = parseInt(temple_id);
    const userIdInt = parseInt((session.user as any).id);

    // Validate temple existence
    const [templeRows] = await db.execute<any[]>('SELECT id, name FROM temples WHERE id = ?', [templeIdInt]);
    if (templeRows.length === 0) {
      return NextResponse.json({ error: "Target temple not found" }, { status: 404 });
    }
    const temple = templeRows[0];

    // Determine values to save
    let finalUrl = url;
    let finalFileId = file_id || null;
    let finalMimeType = mime_type;
    let finalFileName = file_name || url.split('/').pop() || 'file';

    // Auto determine mime type if not provided
    if (!finalMimeType) {
      if (type === 'image') finalMimeType = 'image/jpeg';
      else if (type === 'video') finalMimeType = 'video/mp4';
      else if (type === 'audio') finalMimeType = 'audio/mpeg';
      else if (url.endsWith('.pdf')) finalMimeType = 'application/pdf';
      else finalMimeType = 'application/octet-stream';
    }

    // If remote image and not already uploaded to GDrive (no file_id), copy it
    if (type === 'image' && !finalFileId && !url.includes('googleusercontent.com') && !url.startsWith('data:')) {
      try {
        console.log('Pasted remote image. Uploading to Google Drive...');
        const driveImage = await uploadImageUrlToGoogleDrive(url);
        finalUrl = driveImage.url;
        finalFileId = driveImage.fileId;
      } catch (driveError: any) {
        return NextResponse.json({
          error: `Failed to save image to Google Drive: ${driveError.message || driveError}`
        }, { status: 500 });
      }
    }

    const finalFolderId = folder_id ? parseInt(folder_id) : null;
    const finalCategoryId = category_id ? parseInt(category_id) : null;
    const finalDuration = duration ? parseInt(duration) : null;

    const [res] = await db.execute<any>(
      `INSERT INTO media (
        title, file_name, file_url, file_id, mime_type, file_size, 
        temple_id, folder_id, category_id, uploaded_by, 
        video_type, duration, language, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        title || finalFileName.split('.')[0],
        finalFileName,
        finalUrl,
        finalFileId,
        finalMimeType,
        parseInt(file_size || 0),
        templeIdInt,
        finalFolderId,
        finalCategoryId,
        userIdInt,
        video_type || null,
        finalDuration,
        language || null
      ]
    );

    const createdRecord = {
      id: res.insertId,
      title: title || finalFileName.split('.')[0],
      file_name: finalFileName,
      file_url: finalUrl,
      file_id: finalFileId,
      mime_type: finalMimeType,
      file_size: parseInt(file_size || 0),
      temple_id: templeIdInt,
      folder_id: finalFolderId,
      category_id: finalCategoryId,
      uploaded_by: userIdInt,
      video_type: video_type || null,
      duration: finalDuration,
      language: language || null
    };

    // Log administrative action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [userIdInt, `Uploaded and registered media asset "${createdRecord.title}" for Temple: ${temple.name}`]
    );

    return NextResponse.json(createdRecord, { status: 201 });
  } catch (error) {
    console.error('Create media error:', error);
    return NextResponse.json({ error: 'Failed to register media asset' }, { status: 500 });
  }
}
