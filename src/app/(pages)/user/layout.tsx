"use client";
import Sidebar from "@/components/shared/sideBar";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useState } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider>
      <section className="flex bg-background min-h-screen">
        <Sidebar open={open} setOpen={setOpen} />

        {/* main content wrapper */}
        <section className="flex-1 h-screen overflow-y-auto">
          {/* Top bar with theme toggle */}
          <header className="bg-sidebar-bg py-2 px-6 md:px-8 flex justify-between items-center">
            {/* Sheet Toggle Button */}
            <button
              className="p-2 rounded-lg bg-card hover:bg-card-hover border border-border transition-all duration-200 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <CircleChevronRight size={18} />
              ) : (
                <CircleChevronLeft size={18} />
              )}
            </button>

            {/* Mode Toggle Button */}
            <ThemeToggle />
          </header>
          <main className="p-6 md:p-8">{children}</main>
        </section>
      </section>
    </ThemeProvider>
  );
}
