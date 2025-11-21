import React from 'react'
import { IconType } from 'react-icons';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: IconType;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'primary' | 'secondary' | 'main' | 'blue' | 'purple' | 'orange';
}

export default function StatsCard({ title, value, icon: Icon, trend, color = 'primary' }: StatsCardProps) {

    const colorMap = {
        primary: 'bg-slate-800 text-white',
        secondary: 'bg-teal-700 text-white',
        main: 'bg-emerald-600 text-white',
        blue: 'bg-blue-600 text-white',
        purple: 'bg-purple-600 text-white',
        orange: 'bg-orange-500 text-white',
    };

    const iconBgMap = {
        primary: 'bg-slate-700',
        secondary: 'bg-teal-600',
        main: 'bg-emerald-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        orange: 'bg-orange-400',
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
            <div className={`p-4 rounded-xl ${colorMap[color]} shadow-lg shadow-${color}-500/20`}>
                <Icon className="text-2xl" />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                <div className="flex items-end gap-2">
                    <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
                    {trend && (
                        <span className={`text-xs font-medium mb-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
