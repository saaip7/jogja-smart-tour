"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";

import { NavUser } from "@/components/nav-user";
import { useAuth } from "@/contexts/AuthContext";

import Image from "next/image";
import { LogOut, BookText } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const data = [
  {
    title: "Jelajahi",
    url: "#",
    icon: BookText,
    konten: "Konten 1",
    isActive: true,
  },
];

export function AppSidebar({
  onSelect,
  ...props
}: { onSelect: (konten: string) => void } & React.ComponentProps<
  typeof Sidebar
>) {
  const { logout } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={`w-full h-10 flex items-center ${
            isCollapsed ? "justify-center" : "text-center"
          }`}
        >
          <div
            className={
              isCollapsed ? "w-full relative h-full" : "w-3/4 relative h-full"
            }
          >
            <Image
              src="/Logo_JST.svg"
              alt="Jogja Smart Tour Logo"
              fill
              className="object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="w-1/4 h-full">
              <NavUser />
            </div>
          )}
        </div>
      </SidebarHeader>
      <Separator className="mt-4 mb-4" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton
                    asChild
                    onClick={() => item.konten && onSelect(item.konten)}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Show NavUser in collapsed state */}
      {isCollapsed && (
        <div className="mt-4 flex justify-center">
          <NavUser collapsed />
        </div>
      )}

      <Button
        onClick={() => logout()}
        className={`flex items-center rounded self-center mb-4 bg-primary-100 hover:bg-primary-300 text-primary-700 ${
          isCollapsed ? "w-8 h-8 p-0 justify-center" : "w-[10rem] h-10"
        }`}
      >
        <LogOut className="shrink-0" />
        {!isCollapsed && <span className="ml-2">Sign Out</span>}
      </Button>
      <SidebarRail />
    </Sidebar>
  );
}
