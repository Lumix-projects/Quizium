import Sidebar from '@/components/shared/sideBar'
import ThemeToggle from '@/components/shared/ThemeToggle';
import { ThemeProvider } from '@/contexts/ThemeContext';
import React from 'react'

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider>
            <section className='flex bg-background min-h-screen'>
                <Sidebar />

                {/* main content wrapper */}
                <section className='flex-1 h-screen overflow-y-auto'>
                    <div className='p-6 md:p-8'>
                        {/* Top bar with theme toggle */}
                        <div className='flex justify-end mb-6'>
                            <ThemeToggle />
                        </div>

                        {children}
                    </div>
                </section>
            </section>
        </ThemeProvider>
    )
}
