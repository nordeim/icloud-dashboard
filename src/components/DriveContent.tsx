// src/components/DriveContent.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function DriveContent() {
  const { data: session } = useSession();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !session) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/drive/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  if (!session) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600">Please sign in to access Google Drive</h2>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <input
          type="file"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {uploading && (
          <p className="text-sm text-gray-600">
            Uploading...
          </p>
        )}
      </div>
    </div>
  );
}
