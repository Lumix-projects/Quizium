import Sidebar from '@/components/shared/sideBar'
import React from 'react'

export default function page() {
  return (
    <section className='flex'>
    <Sidebar />

    {/* main content */}
    <section>
      test
    </section>
    </section>
  )
}
