"use client";
import { FaBook, FaClipboardList, FaCommentDots, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { HiX, HiMenu } from "react-icons/hi";

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [open, setOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', icon: MdSpaceDashboard, label: 'Dashboard' },
        { id: 'subject', icon: FaBook, label: 'Subject' },
        { id: 'exams', icon: FaClipboardList, label: 'Exams' },
        { id: 'feedback', icon: FaCommentDots, label: 'Feedback' },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className={`lg:hidden fixed  z-50 p-2 rounded-md transition-all duration-300 ${
                    open ? "text-white left-50 top-8" : "text-black left-5 top-8"
                }`}
                onClick={() => setOpen(!open)}
            >
                {open ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            <aside
                className={`flex flex-col justify-between rounded-r-3xl w-64 h-screen text-white p-6 fixed lg:static top-0 left-0 transition-transform duration-300 z-40  ${
                    open ? 'translate-x-0 bg-black' : '-translate-x-full lg:translate-x-0'
                }`}
            >
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
                                    onClick={() => {
                                        setActiveItem(item.id);
                                        setOpen(false); // Close sidebar on mobile when item is clicked
                                    }}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                                        isActive
                                            ? 'bg-white/10 text-white shadow-lg shadow-white/10'
                                            : 'hover:bg-white/5 text-slate-300 hover:text-white'
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <Icon className={`text-xl relative z-10 ${isActive ? 'animate-pulse' : ''}`} />
                                    <span className="font-medium relative z-10">{item.label}</span>

                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
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
        </>
    );
}