import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { uploadToGoogleDrive } from '@/lib/gdrive';
import path from 'path';

export async function POST(req: Request) {
  try {
    // Check credentials session
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded in form data' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const finalName = `${Date.now()}-${baseName}${extension}`;

    const isGDriveConfigured = 
      (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) ||
      (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);

    if (!isGDriveConfigured) {
      return NextResponse.json({
        error: 'Google Drive storage is required. Configure either GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN, or a service account with GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.'
      }, { status: 500 });
    }

    console.log('Attempting Google Drive upload...');
    try {
      const driveResult = await uploadToGoogleDrive(buffer, finalName, file.type);
      return NextResponse.json({
        url: driveResult.url,
        name: originalName,
        size: file.size,
        type: file.type,
        provider: 'gdrive',
        fileId: driveResult.fileId
      });
    } catch (driveError: any) {
      console.error('Google Drive Upload Failed:', driveError);
      return NextResponse.json({
        error: `Google Drive upload failed: ${driveError.message || driveError}. Service accounts cannot upload to My Drive without quota; use a shared drive/folder owned by a user, or configure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN for OAuth uploads.`
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('File upload API crash:', error);
    return NextResponse.json({
      error: `Upload handler crash: ${error.message || error}`
    }, { status: 500 });
  }
}
