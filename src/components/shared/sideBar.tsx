"use client";
import { FaBook, FaClipboardList, FaCommentDots, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', icon: MdSpaceDashboard, label: 'Dashboard' },
        { id: 'subject', icon: FaBook, label: 'Subject' },
        { id: 'exams', icon: FaClipboardList, label: 'Exams' },
        { id: 'feedback', icon: FaCommentDots, label: 'Feedback' },
    ];

    return (
            <aside className="flex flex-col justify-between w-64 h-screen bg-black/80 text-white p-6 relative">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-32 pointer-events-none"></div>
                
                {/* Logo & Menu */}
                <div className="flex flex-col gap-12 relative z-10">
                    {/* Logo */}
                    <div className="text-3xl font-bold flex items-center gap-2">
                        Quizium
                    </div>

                    {/* Menu Items */}
                    <nav className="flex flex-col gap-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeItem === item.id;
                            
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveItem(item.id)}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                                        isActive 
                                            ? 'bg-linear-to-r from-background/40 to-background/10 text-background shadow-lg shadow-white/10' 
                                            : 'hover:bg-background/80 text-background/80 hover:text-background'
                                    }`}
                                >
                                    {/* Hover effect background */}
                                    <div className="absolute inset-0 bg-linear-to-r from-background/40 to-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <Icon className={`text-xl relative z-10 ${isActive ? 'animate-pulse' : ''}`} />
                                    <span className="font-medium relative z-10">{item.label}</span>
                                    
                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-background rounded-r-full"></div>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-3 relative z-10">
                    <div className="h-px bg-linear-to-r from-transparent via-slate-600 to-transparent mb-2"></div>
                    
                    <button className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 group">
                        <FaCog className="text-xl group-hover:rotate-90 transition-transform duration-500" />
                        <span className="font-medium">Settings</span>
                    </button>
                    
                    <button className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group">
                        <FaSignOutAlt className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
    );
}