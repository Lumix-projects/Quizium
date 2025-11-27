"use client";
import Logo from "@/components/Logo";
import Sidebar from "@/components/shared/sideBar";
import ThemeToggle from "@/components/shared/ThemeToggle";
import SearchBar from "@/components/shared/SearchBar";
import { Bell, CircleChevronRight, Search } from "lucide-react";
import { useState } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <section className="flex bg-background min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />

      {/* main content wrapper */}
      <section className="flex-1 h-screen overflow-y-auto">
        {/* Top bar with theme toggle */}
        <header className="bg-sidebar py-2 px-6 md:px-8 flex justify-between items-center gap-2 border-b border-border">
          {/* Sheet Toggler Container And Logo */}
          <div className="flex items-center ">
            {/* Sheet Toggle Button */}
            <button
              className="secondary-btn xl:hidden"
              onClick={() => setOpen(!open)}
            >
              <CircleChevronRight size={18} />
            </button>

            {/* Website Logo */}
            <h3 className="flex items-center font-semibold text-2xl">
              <Logo />
              <span>uizium</span>
            </h3>
          </div>

          {/* Search Input */}
          <SearchBar />

          {/* Mode Toggle & Notification Button */}
          <div className="space-x-2">
            {/* Search Button */}
            <button
              className="secondary-btn lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={18} />
            </button>

            {/* Notification Button */}
            <button className="secondary-btn">
              <Bell size={18} />
            </button>

            {/* Mode Toggle */}
            <ThemeToggle />
          </div>
        </header>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden bg-sidebar border-b border-border p-4 duration-300">
            <SearchBar className="flex w-full" autoFocus />
          </div>
        )}

        {/* Main Content */}
        <main className="p-6 md:p-8">{children}</main>
      </section>
    </section>
  );
}
