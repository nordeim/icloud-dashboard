// src/components/ProfileContent.tsx
import React from 'react';
import { FiUser } from 'react-icons/fi';

const ProfileContent: React.FC = () => {
  return (
    <div className="text-center"> {/* Center aligning the text content */}
      <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto mb-2 flex items-center justify-center">
        <FiUser size={48} className="text-gray-500" /> {/* User Icon inside profile */}
      </div>
      <p className="text-lg font-medium">Jess</p>
      <p className="text-sm text-gray-500">apple_id@icloud.com</p> {/* Updated email as in screenshot */}
      <p className="text-sm text-gray-500 mt-2">iCloud</p>
    </div>
  );
};

export default ProfileContent;
