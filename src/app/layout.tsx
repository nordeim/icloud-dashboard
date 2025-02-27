import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import Providers from "@/components/Providers";
import type { ReactNode } from "react";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthSessionProvider>
          <AuthProvider>
            <Providers>
              {children}
            </Providers>
            <Toaster position="top-right" />
          </AuthProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
