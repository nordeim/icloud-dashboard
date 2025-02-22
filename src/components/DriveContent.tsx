// src/components/DriveContent.tsx
import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const DriveContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center"> {/* Center aligning content */}
      <p className="text-lg font-medium text-left w-full">Recents</p> {/* Aligned Recents text to left */}
      <div className="mt-4 flex flex-col items-center justify-center space-y-2">
        <FiUploadCloud size={48} className="text-gray-500" />
        <p className="text-gray-500 text-center">Upload your first file</p> {/* Center aligned text */}
      </div>
    </div>
  );
};

export default DriveContent;
