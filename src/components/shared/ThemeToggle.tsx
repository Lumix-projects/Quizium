"use client";

import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi";
import Button from "../ui/Button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? (
        <HiMoon className="text-lg text-foreground w-5 h-5" />
      ) : (
        <HiSun className="text-lg text-foreground w-5 h-5" />
      )}
    </Button>
  );
}
