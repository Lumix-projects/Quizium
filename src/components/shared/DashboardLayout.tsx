"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./sideBar";
import { UserData } from "@/types/user";

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserData;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 bg-background">{children}</main>
      </div>
    </div>
  );
}
