import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { uploadToGoogleDrive } from '@/lib/gdrive';
import fs from 'fs';
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

    // Smart Storage Switch
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

    if (serviceAccountEmail && serviceAccountKey) {
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
          error: `Google Drive upload failed: ${driveError.message || driveError}`
        }, { status: 500 });
      }
    }

    // Local Storage Mode (works on local PC, fails gracefully on Vercel)
    console.log('Using local disk storage...');
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, finalName);
      await fs.promises.writeFile(filePath, buffer);

      return NextResponse.json({
        url: `/uploads/${finalName}`,
        name: originalName,
        size: file.size,
        type: file.type,
        provider: 'local'
      });
    } catch (fsError: any) {
      console.error('Local disk write failed:', fsError);
      return NextResponse.json({
        error: 'File system is read-only on Vercel. Please configure your GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY environment variables in Vercel settings to enable cloud file uploads.'
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('File upload API crash:', error);
    return NextResponse.json({
      error: `Upload handler crash: ${error.message || error}`
    }, { status: 500 });
  }
}
