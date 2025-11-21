import DashboardCard from '@/components/shared/dashboard/DashboardCard'
import React from 'react'

export default function page() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">History</h1>

            <DashboardCard title="Quiz History">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-800 font-semibold uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Quiz Name</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Score</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 rounded-r-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-slate-800">Introduction to React</td>
                                    <td className="px-4 py-3">Oct 24, 2023</td>
                                    <td className="px-4 py-3 font-bold">85%</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">Passed</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="text-blue-600 hover:underline">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardCard>
        </div>
    )
}
