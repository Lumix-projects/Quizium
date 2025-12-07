"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBook,
  FaClipboardList,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { HiX } from "react-icons/hi";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/Button";
import { UserData } from "@/types/user";

interface SidebarProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  user: UserData;
}

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Menu Links
  const menuItems = [
    {
      id: "dashboard",
      href: "/",
      icon: MdSpaceDashboard,
      label: "Dashboard",
    },
    { id: "subjects", href: "/subjects", icon: FaBook, label: "Subjects" },
    {
      id: "quizzes",
      href: "/quizzes",
      icon: FaQuestionCircle,
      label: "Quizzes",
    },
    {
      id: "history",
      href: "/history",
      icon: FaClipboardList,
      label: "History",
    },
    { id: "settings", href: "/settings", icon: FaCog, label: "Settings" },
  ];

  // Logout Function
  const handleLogout = () => {
    cookies.remove("auth_token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => onClose(false)}
        ></div>
      )}

      {/* Main Sidebar */}
      <aside
        className={cn(
          "flex flex-col gap-5 h-screen w-72 bg-sidebar border-r border-sidebar-border fixed inset-y-0 z-40 xl:sticky xl:top-0 py-4 transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0 w-80" : "-translate-x-full xl:translate-x-0"
        )}
      >
        {/* User Details */}
        <header className="flex items-center gap-3 border-b border-border px-4 pb-2">
          <div className=" flex items-center gap-3 text-foreground overflow-hidden">
            <Image
              src={user?.profileImage || "/avatar.png"}
              alt="user image"
              width={200}
              height={200}
              priority
              className="rounded-full w-10 h-10 shrink-0"
            />
            <div className="flex flex-col">
              <span>{user?.name}</span>
              <span className="text-xs">{user?.email}</span>
            </div>
          </div>
          <Button
            variant="icon"
            className="ms-auto lg:hidden"
            onClick={() => onClose(false)}
          >
            <HiX />
          </Button>
        </header>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-4 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => onClose(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted/5"
                )}
              >
                <Icon className="text-base" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 mx-3 py-2.5 rounded-lg text-muted-foreground hover:text-error hover:bg-error/5 duration-300 font-medium text-sm cursor-pointer"
        >
          <FaSignOutAlt className="text-base" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
