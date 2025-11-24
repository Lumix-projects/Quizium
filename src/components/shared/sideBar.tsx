"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBook, FaClipboardList, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { HiX } from "react-icons/hi";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

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
      icon: FaClipboardList,
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
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
      <aside
        className={cn(
          "flex flex-col justify-between h-screen w-64 bg-sidebar border-r border-sidebar-border fixed top-0 z-40 lg:static p-5 transition-all duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo & Navigation */}
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-semibold text-foreground">
              Quizium
            </span>
            <button
              className="ms-auto cursor-pointer lg:hidden"
              onClick={() => setOpen(false)}
            >
              <HiX />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 font-medium text-sm ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
                  }`}
                >
                  <Icon className="text-base" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="flex flex-col gap-3">
          <div className="h-px bg-border"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-error hover:bg-error/5 transition-all duration-150 font-medium text-sm"
          >
            <FaSignOutAlt className="text-base" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
