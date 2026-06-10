'use client';

import React from 'react';
import MediaLibrary from '@/components/admin/MediaLibrary';

export default function AdminMediaUploadPage() {
  return <MediaLibrary forcedUpload={true} />;
}
