"use client";

import DashboardCard from '@/components/shared/dashboard/DashboardCard'
import HistoryTable from '@/components/shared/dashboard/HistoryTable'
import React, { useEffect, useState } from 'react'
import { getUserScores } from '@/services/user'
import { Score } from '@/types'
import toast from 'react-hot-toast'

export default function page() {
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const scoresData = await getUserScores();
                setScores(scoresData);
            } catch (error) {
                console.error("Failed to fetch history data", error);
                toast.error("Failed to load history");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh] text-slate-500">Loading history...</div>;
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
