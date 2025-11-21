"use client";
import { useTheme } from '@/contexts/ThemeContext';
import { HiMoon, HiSun } from 'react-icons/hi';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-card hover:bg-card-hover border border-border transition-all duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <HiMoon className="text-lg text-foreground" />
            ) : (
                <HiSun className="text-lg text-foreground" />
            )}
        </button>
    );
}
