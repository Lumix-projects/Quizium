"use client";
import Logo from "@/components/Logo";
import Sidebar from "@/components/shared/sideBar";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Bell, CircleChevronRight, Search } from "lucide-react";
import { useState } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

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
              className="secondary-btn lg:hidden"
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
          <div className="w-1/2 relative hidden lg:flex justify-center group">
            <label
              htmlFor="searchInput"
              className="bg-background rounded-s-full text-muted-foreground px-4 border-2 border-input-border border-e-0 group-focus-within:border-primary duration-300 flex items-center cursor-text"
            >
              <Search size={18} />
            </label>
            <input
              type="text"
              id="searchInput"
              placeholder="Search Subjects..."
              className="w-2/3 focus:w-full duration-300 border-s-0 py-2.5 rounded-e-full bg-background text-foreground placeholder-muted-foreground outline-none border-2 border-input-border focus:border-primary group-focus-within:border-primary"
            />
          </div>

          {/* Mode Toggle & Notification Button */}
          <div className="space-x-2">
            {/* Search Button */}
            <button className="secondary-btn lg:hidden">
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

        {/* Main Content */}
        <main className="p-6 md:p-8">{children}</main>
      </section>
    </section>
  );
}
