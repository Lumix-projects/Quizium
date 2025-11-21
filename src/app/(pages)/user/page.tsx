import DashboardCard from '@/components/shared/dashboard/DashboardCard'
import StatsCard from '@/components/shared/dashboard/StatsCard'
import React from 'react'
import { FiSearch, FiTrendingUp, FiActivity, FiCheckCircle, FiClock } from 'react-icons/fi'

export default function page() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>Dashboard</h1>
          <p className='text-slate-500'>Welcome back, User!</p>
        </div>

        <div className="w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:border-slate-300 focus:bg-white transition-all"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Quizzes"
          value="12"
          icon={FiCheckCircle}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Average Score"
          value="85%"
          icon={FiTrendingUp}
          color="main"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Time Spent"
          value="4h 30m"
          icon={FiClock}
          color="orange"
        />
        <StatsCard
          title="Active Streak"
          value="3 Days"
          icon={FiActivity}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <DashboardCard title="Recent Activity" action={<button className="text-sm text-blue-600 font-medium hover:underline">View All</button>}>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      JS
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">JavaScript Basics</h4>
                      <p className="text-xs text-slate-500">Completed 2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-slate-800">80%</span>
                    <span className="text-xs text-green-600">Passed</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Recommended Quizzes - Takes up 1 column */}
        <div className="lg:col-span-1">
          <DashboardCard title="Recommended for You">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Advanced React Patterns</h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span>15 Questions</span>
                      <span>•</span>
                      <span>Intermediate</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}
