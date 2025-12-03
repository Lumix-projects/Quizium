"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { Bell, Search } from "lucide-react";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import {Button} from "../ui/Button";

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
      <header className="bg-sidebar py-2 px-6 md:px-8 flex justify-between items-center gap-2 border-b border-border sticky top-0">
        {/* Sidebar Toggler and Logo */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button */}
          <Button
            variant="icon"
            className="xl:hidden"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <HiX size={18} /> : <FiMenu size={18} />}
          </Button>

          {/* Website Logo */}
          <h3 className="flex items-center font-semibold text-2xl">
            <Logo />
            <span>uizium</span>
          </h3>
        </div>

        {/* Desktop Search Input */}
        <SearchBar />

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="icon"
            className="lg:hidden"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
          >
            <Search size={18} />
          </Button>

          {/* Notification Button */}
          <Button variant="icon" aria-label="Notifications">
            <Bell size={18} />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden bg-sidebar border-b border-border p-4 animate-in slide-in-from-top duration-200">
          <SearchBar className="flex w-full" autoFocus />
        </div>
      )}
    </>
  );
}
