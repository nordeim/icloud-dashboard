import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken as string });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const fileBuffer = await file.arrayBuffer();
    
    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
      },
      media: {
        mimeType: file.type,
        body: Buffer.from(fileBuffer),
      },
    });

    return NextResponse.json({ fileId: response.data.id });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
} 