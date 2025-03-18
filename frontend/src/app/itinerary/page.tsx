"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useState, ReactNode } from "react";
import { data } from "@/components/app-sidebar";
import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CreateItinerary from "@/components/CreateItinerary";
import ItineraryList from "@/components/ItineraryList";

export default function Page() {
  // Check if data is an array and has elements before accessing
  const [selectedMenu, setSelectedMenu] = useState<ReactNode | null>(
    Array.isArray(data) && data.length > 0 && data[0].konten
      ? data[0].konten
      : null
  );

  // Initialize with proper data structure
  const [activePage, setActivePage] = useState(
    Array.isArray(data) && data.length > 0 ? data[0].title : "Dashboard"
  );

  // Add state to track if we're in create mode
  const [isCreating, setIsCreating] = useState(false);

  const { isAuthenticated } = useAuth();

  const handleSelect = (
    konten: ReactNode | React.SyntheticEvent<HTMLDivElement>
  ) => {
    if (React.isValidElement(konten) || typeof konten === "string") {
      setSelectedMenu(konten);
      setIsCreating(false); // Reset create mode when selecting from sidebar

      // Find the menu item with this konten value
      const activeItem = data.find((item) => item.konten === konten);

      if (activeItem) {
        setActivePage(activeItem.title);
      }
    }
  };

  // Handle create button click
  const handleCreateNew = () => {
    setIsCreating(true);
    setActivePage("Buat Rencana Baru");
  };

  // Handle back button click
  const handleBack = () => {
    setIsCreating(false);

    // Restore the previous active page and menu
    if (Array.isArray(data) && data.length > 0) {
      setActivePage(data[0].title);
      setSelectedMenu(data[0].konten);
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
              <SidebarTrigger className="-ml-1 text-primary-700" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {isCreating && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={handleBack}
                          className="flex items-center text-primary-500 hover:text-primary-700"
                        >
                          <div className="flex items-center gap-1 w-6 h-6 bg-primary-100 justify-center rounded">
                            <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                          </div>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  )}
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-xl text-primary-500 font-semibold">
                      {activePage}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {!isCreating && (
              <Button
                className="bg-primary-500 hover:bg-primary-700"
                onClick={handleCreateNew}
              >
                <div className="font-medium">+ Rencana Baru</div>
              </Button>
            )}
          </header>
          <Separator className="mt-2" />

          {/* Content area */}
          <div className="flex-1 overflow-auto">
            {isCreating ? (
              <CreateItinerary onBack={handleBack} />
            ) : selectedMenu ? (
              selectedMenu
            ) : (
              <div className="p-4">
                Pilih menu di samping untuk melihat konten
              </div>
            )}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
