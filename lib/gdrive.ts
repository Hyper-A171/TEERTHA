import { google } from 'googleapis';
import { Readable } from 'stream';

// Load credentials from environment
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1Q7m3OvGfYzkdvVfBmjUEQb4mdPYw4Lmq';

// Helper to convert buffer to stream
function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export async function uploadToGoogleDrive(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ url: string; fileId: string }> {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Google Service Account credentials (EMAIL and PRIVATE_KEY) are missing in environment variables.');
  }

  // Setup JWT Auth
  const auth = new google.auth.JWT(
    CLIENT_EMAIL,
    undefined,
    PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle escaped newlines from environment strings
    ['https://www.googleapis.com/auth/drive']
  );

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
  });

  // Generate direct high-speed streaming link
  // lh3.googleusercontent.com/d/FILE_ID supports streaming and direct rendering in browser <img> / <video> tags
  const directLink = `https://lh3.googleusercontent.com/d/${fileId}`;

  return {
    url: directLink,
    fileId: fileId,
  };
}
