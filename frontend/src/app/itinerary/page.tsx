"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { data } from "@/components/app-sidebar";
import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";

// Create content components for each menu item
const ContentMap: Record<string, React.ReactNode> = {
  "Konten 1": (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Jelajahi Wisata</h1>
      <p className="mt-4">
        Temukan tempat wisata menarik di Jogja dan rencanakan perjalanan Anda
        dengan mudah.
      </p>
    </div>
  ),
  // Add more content components as needed
};

export default function Page() {
  // Check if data is an array and has elements before accessing
  const [selectedMenu, setSelectedMenu] = useState<string | null>(
    Array.isArray(data) && data.length > 0 && data[0].konten
      ? data[0].konten
      : null
  );

  // Initialize with proper data structure
  const [activePage, setActivePage] = useState(
    Array.isArray(data) && data.length > 0 ? data[0].title : "Dashboard"
  );

  const { isAuthenticated } = useAuth();

  const handleSelect = (
    KontenOrEvent: string | React.SyntheticEvent<HTMLDivElement>
  ) => {
    if (typeof KontenOrEvent === "string") {
      setSelectedMenu(KontenOrEvent);

      // Find the menu item with this konten value
      const activeItem = data.find((item) => item.konten === KontenOrEvent);

      if (activeItem) {
        setActivePage(activeItem.title);
      }
    }
  };

  if (!isAuthenticated) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen w-full">
      <SidebarProvider>
        <AppSidebar onSelect={handleSelect} className="h-full" />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <header className="flex justify-between pr-5 h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activePage}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <Separator className="mt-2" />

          {/* Content area */}
          <div className="flex-1 overflow-auto">
            {selectedMenu && ContentMap[selectedMenu] ? (
              ContentMap[selectedMenu]
            ) : (
              <div className="p-6">
                <h1 className="text-2xl font-bold">
                  Selamat datang di Jogja Smart Tour
                </h1>
                <p className="mt-4">
                  Silakan pilih menu di sidebar untuk melihat konten.
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
