import DashboardCard from '@/components/shared/dashboard/DashboardCard'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

export default function page() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">My Quizzes</h1>
                <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors">
                    <FiPlus />
                    <span>Create New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <DashboardCard key={i} title={`Quiz Title ${i}`} className="hover:shadow-md transition-shadow cursor-pointer">
                        <div className="space-y-4">
                            <p className="text-slate-500 text-sm">A short description of the quiz goes here. It can be two lines long.</p>
                            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                                <span>10 Questions</span>
                                <span>15 mins</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Published</span>
                                <button className="text-blue-600 text-sm hover:underline">Edit</button>
                            </div>
                        </div>
                    </DashboardCard>
                ))}
            </div>
        </div>
    )
}
