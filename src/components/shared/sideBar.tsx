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
import { useUser } from "@/hooks/useUser";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  // Menu Links
  const menuItems = [
    {
      id: "dashboard",
      href: "/user",
      icon: MdSpaceDashboard,
      label: "Dashboard",
    },
    { id: "subjects", href: "/user/subjects", icon: FaBook, label: "Subjects" },
    {
      id: "quizzes",
      href: "/user/quizzes",
      icon: FaQuestionCircle,
      label: "Quizzes",
    },
    {
      id: "history",
      href: "/user/history",
      icon: FaClipboardList,
      label: "History",
    },
    { id: "settings", href: "/user/settings", icon: FaCog, label: "Settings" },
  ];

  // Logout Function
  const handleLogout = () => {
    cookies.remove("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
      <aside
        className={cn(
          "flex flex-col gap-5 h-screen w-64 bg-sidebar border-r border-sidebar-border fixed top-0 z-40 xl:static py-4 transition-all duration-300 ease-in-out",
          open ? "translate-x-0 w-80" : "-translate-x-full xl:translate-x-0"
        )}
      >
        {/* Logo & Navigation */}

        {/* Logo */}
        <header className="flex items-center gap-3 border-b border-border px-4 pb-2">
          <div className=" flex items-center gap-3 text-foreground">
            <Image
              src={user?.profileImage || "/avatar.png"}
              alt="user image"
              width={200}
              height={200}
              priority
              className="rounded-full w-9 h-9"
            />
            <div className="flex flex-col">
              <span>{user?.name}</span>
              <span className="text-xs">{user?.email}</span>
            </div>
          </div>
          <button
            className="ms-auto cursor-pointer secondary-btn lg:hidden"
            onClick={() => setOpen(false)}
          >
            <HiX />
          </button>
        </header>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-4 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/user"
                ? pathname === "/user"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-full duration-300 font-medium text-sm",
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
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
