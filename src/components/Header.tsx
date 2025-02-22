import React from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <header className="bg-icloud-blue text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">iCloud</div>
          <nav className="flex space-x-4">
            <FiMenu size={24} className="cursor-pointer" />
            <FiBell size={24} className="cursor-pointer" />
            <FiUser size={24} className="cursor-pointer" />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
