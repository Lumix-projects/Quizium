import Sidebar from '@/components/shared/sideBar'
import React from 'react'

export default function page() {
  return (
    <section className='flex bg-black/80'>
    <Sidebar />

    {/* main content */}
    <section className='p-4 w-full min-h-screen'>
      <div className='bg-white/85 py-6 px-14 h-full rounded-3xl'>
      test
      </div>
    </section>
    </section>
  )
}
