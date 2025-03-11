import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

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
      <body
        className={`${poppins.className} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <main className="flex-grow">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
