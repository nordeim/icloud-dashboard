// src/components/NotesContent.tsx
import React from 'react';
import { FiPlus } from 'react-icons/fi';

const NotesContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center"> {/* Center aligning content */}
      <p className="text-lg font-medium text-left w-full">All iCloud</p> {/* Aligned All iCloud text to left */}
      <div className="mt-4 flex flex-col items-center justify-center space-y-2">
        <FiPlus size={48} className="text-gray-500" />
        <p className="text-gray-500 text-center">Create your first note</p> {/* Center aligned text */}
      </div>
    </div>
  );
};

export default NotesContent;
