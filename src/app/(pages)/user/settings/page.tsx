import DashboardCard from '@/components/shared/dashboard/DashboardCard'
import React from 'react'

export default function page() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCard title="Profile Information">
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">First Name</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors" defaultValue="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Last Name</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors" defaultValue="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="pt-4">
                            <button className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors">Save Changes</button>
                        </div>
                    </form>
                </DashboardCard>

                <DashboardCard title="Preferences">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Email Notifications</h4>
                                <p className="text-xs text-slate-500">Receive emails about new quizzes</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Dark Mode</h4>
                                <p className="text-xs text-slate-500">Toggle dark theme</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
                            </label>
                        </div>
                    </div>
                </DashboardCard>
            </div>
        </div>
    )
}
