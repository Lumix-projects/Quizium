import React from 'react'

interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export default function DashboardCard({ title, children, className = "", action }: DashboardCardProps) {
    return (
        <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                {action && <div>{action}</div>}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
