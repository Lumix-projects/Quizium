import Sidebar from '@/components/shared/sideBar'
import React from 'react'

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex bg-black/80 min-h-screen'>
            <Sidebar />

            {/* main content wrapper */}
            <section className='p-4 w-full h-screen overflow-y-auto'>
                <div className='bg-white/85 py-6 px-8 md:px-14 min-h-full rounded-3xl'>
                    {children}
                </div>
            </section>
        </section>
    )
}
