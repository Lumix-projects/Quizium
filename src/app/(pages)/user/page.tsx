import Sidebar from '@/components/shared/sideBar'
import React from 'react'

export default function page() {
  return (
    <section className='flex bg-black/80'>
    <Sidebar />

    {/* main content */}
    <section className='p-4 w-full '>
      <div className='bg-white p-10 h-full rounded-3xl'>
      test
      </div>
    </section>
    </section>
  )
}
