"use client";

import DashboardCard from '@/components/shared/dashboard/DashboardCard'
import HistoryTable from '@/components/shared/dashboard/HistoryTable'
import React from 'react'
import { useScores } from '@/hooks/useScores'
import { Skeleton } from "@/components/shared/Skeleton";

export default function page() {
    const { scores, loading } = useScores();

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-32 mb-2" />
                        <Skeleton className="h-5 w-64" />
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <Skeleton className="h-8 w-12 mb-1" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="space-y-4">
                            {/* Header Row */}
                            <div className="flex items-center justify-between py-2 border-b">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            {/* Data Rows */}
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between py-4 border-b last:border-0">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">History</h1>
                    <p className="text-slate-500">View your past quiz attempts and scores</p>
                </div>
                <div className="text-right">
                    <span className="block text-2xl font-bold text-slate-800">{scores.length}</span>
                    <span className="text-xs text-slate-500">Total Attempts</span>
                </div>
            </div>

            <DashboardCard title="Quiz History">
                <HistoryTable scores={scores} />
            </DashboardCard>
        </div>
    )
}
