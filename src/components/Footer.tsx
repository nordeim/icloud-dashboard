import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} iCloud Dashboard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
