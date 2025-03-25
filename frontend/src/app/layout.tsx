// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import DataDrivenChatbot from "@/components/DataDrivenChatbot";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jogja Smart Tour",
  description: "Platform Perencanaan Wisata Yogyakarta",
  icons: {
    icon: "JST_Head_Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          {children}
          <DataDrivenChatbot />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}