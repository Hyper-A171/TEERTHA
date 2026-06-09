import { google } from 'googleapis';
import { Readable } from 'stream';

// Load credentials from environment
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1Q7m3OvGfYzkdvVfBmjUEQb4mdPYw4Lmq';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const GOOGLE_DRIVE_HOSTS = [
  'drive.google.com',
  'lh3.googleusercontent.com',
  'googleusercontent.com',
];

function normalizePrivateKey(privateKey: string) {
  return privateKey
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\r/g, '');
}

export function isGoogleDriveUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return GOOGLE_DRIVE_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

function extensionFromMimeType(mimeType: string) {
  const extensionMap: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/avif': '.avif',
    'image/svg+xml': '.svg',
  };

  return extensionMap[mimeType.toLowerCase()] || '';
}

function fileNameFromUrl(imageUrl: string, mimeType: string) {
  const fallbackExtension = extensionFromMimeType(mimeType) || '.jpg';

  try {
    const { pathname } = new URL(imageUrl);
    const rawName = pathname.split('/').filter(Boolean).pop() || 'image';
    const cleanName = rawName
      .split('?')[0]
      .toLowerCase()
      .replace(/\.[a-z0-9]+$/i, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    return `${Date.now()}-${cleanName || 'image'}${fallbackExtension}`;
  } catch {
    return `${Date.now()}-image${fallbackExtension}`;
  }
}

// Helper to convert buffer to stream
function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export async function uploadImageUrlToGoogleDrive(
  imageUrl: string
): Promise<{ url: string; fileId: string }> {
  if (isGoogleDriveUrl(imageUrl)) {
    return { url: imageUrl, fileId: '' };
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    throw new Error('Image URL must be a valid absolute URL before it can be copied to Google Drive.');
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('Image URL must use http or https before it can be copied to Google Drive.');
  }

  const response = await fetch(parsedUrl, {
    headers: {
      Accept: 'image/*',
      'User-Agent': 'TEERTHA image importer',
    },
  });

  if (!response.ok) {
    throw new Error(`Could not download image URL before Google Drive upload (${response.status} ${response.statusText}).`);
  }

  const mimeType = response.headers.get('content-type')?.split(';')[0].trim() || 'image/jpeg';
  if (!mimeType.startsWith('image/')) {
    throw new Error(`URL did not return an image. Received content type: ${mimeType}.`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  return uploadToGoogleDrive(buffer, fileNameFromUrl(imageUrl, mimeType), mimeType);
}

export async function uploadToGoogleDrive(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ url: string; fileId: string }> {
  let auth: any;

  if (CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN) {
    // Setup OAuth2 Auth (acts as the user, using the user's storage quota)
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    auth = oauth2Client;
    console.log('Using Google OAuth2 credentials for upload.');
  } else if (CLIENT_EMAIL && PRIVATE_KEY) {
    // Setup JWT Auth (Service Account)
    auth = new google.auth.JWT(
      CLIENT_EMAIL,
      undefined,
      normalizePrivateKey(PRIVATE_KEY),
      ['https://www.googleapis.com/auth/drive']
    );
    console.log('Using Google Service Account credentials for upload.');
  } else {
    throw new Error('Google Drive credentials (either OAuth2 ID/SECRET/REFRESH or Service Account EMAIL/PRIVATE_KEY) are missing in environment variables.');
  }

  const drive = google.drive({ version: 'v3', auth });

  console.log(`Starting Google Drive upload for file: ${fileName} inside folder: ${FOLDER_ID}`);

  // Create file in Drive
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [FOLDER_ID],
    },
    media: {
      mimeType: mimeType,
      body: bufferToStream(fileBuffer),
    },
    fields: 'id, webContentLink, webViewLink',
    supportsAllDrives: true,
  });

  const fileId = response.data.id;
  if (!fileId) {
    throw new Error('Failed to retrieve file ID from Google Drive response');
  }

  console.log(`File created in Google Drive with ID: ${fileId}. Setting public permission...`);

  // Share file publicly so anyone can view it
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
    supportsAllDrives: true,
  });

  // Generate direct high-speed streaming link
  // lh3.googleusercontent.com/d/FILE_ID supports streaming and direct rendering in browser <img> / <video> tags
  const directLink = `https://lh3.googleusercontent.com/d/${fileId}`;

  return {
    url: directLink,
    fileId: fileId,
  };
}
