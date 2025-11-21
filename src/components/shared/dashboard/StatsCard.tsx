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
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        main: 'bg-success/10 text-success',
        blue: 'bg-blue-500/10 text-blue-600',
        purple: 'bg-purple-500/10 text-purple-600',
        orange: 'bg-orange-500/10 text-orange-600',
    };

    return (
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 transition-all duration-200 hover:border-primary/30">
            <div className={`p-3.5 rounded-lg ${colorMap[color]}`}>
                <Icon className="text-xl" />
            </div>
            <div className="flex-1">
                <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wide">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h4 className="text-2xl font-bold text-foreground">{value}</h4>
                    {trend && (
                        <span className={`text-xs font-semibold ${trend.isPositive ? 'text-success' : 'text-error'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
