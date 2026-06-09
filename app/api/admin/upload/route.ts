import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
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

    // Create uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const originalName = file.name;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    const finalName = `${Date.now()}-${baseName}${extension}`;
    const filePath = path.join(uploadDir, finalName);

    await fs.promises.writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${finalName}`,
      name: originalName,
      size: file.size,
      type: file.type
    });
  } catch (error: any) {
    console.error('File upload API crash:', error);
    return NextResponse.json({ error: 'Internal server error during upload' }, { status: 500 });
  }
}
