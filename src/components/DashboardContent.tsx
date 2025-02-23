'use client';

import React from 'react';
import Header from './Header';
import Widget from './Widget';
import ProfileContent from './ProfileContent';
import MailContent from './MailContent';
import DriveContent from './DriveContent';
import NotesContent from './NotesContent';
import Footer from './Footer';
import { FiUser, FiMail, FiUploadCloud, FiFileText, FiMoreHorizontal } from 'react-icons/fi';
import LoginButton from './LoginButton';

export default function DashboardContent({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />
      <main className="container mx-auto p-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">iCloud Dashboard</h1>
          <LoginButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Widget icon={<FiUser size={24} className="text-[var(--color-accent)]" />} title="Profile">
            <ProfileContent />
          </Widget>
          <Widget
            icon={<FiMail size={24} className="text-[var(--color-accent)]" />}
            title="Mail"
            topRightIcon={<FiMoreHorizontal size={20} className="text-[var(--color-text-primary)]" />}
          >
            {isAuthenticated ? (
              <MailContent />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl text-[var(--color-text-primary)]">Please sign in to view your emails</h2>
              </div>
            )}
          </Widget>
          <Widget icon={<FiUploadCloud size={24} className="text-[var(--color-accent)]" />} title="Drive">
            <DriveContent />
          </Widget>
          <Widget icon={<FiFileText size={24} className="text-[var(--color-accent)]" />} title="Notes">
            <NotesContent />
          </Widget>
        </div>
      </main>
      <Footer />
    </div>
  );
}
