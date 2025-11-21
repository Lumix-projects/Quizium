"use client";

import DashboardCard from '@/components/shared/dashboard/DashboardCard'
import StatsCard from '@/components/shared/dashboard/StatsCard'
import React, { useEffect, useState } from 'react'
import { FiSearch, FiTrendingUp, FiActivity, FiCheckCircle, FiClock } from 'react-icons/fi'
import { getUserProfile, getUserScores } from '@/services/user'
import { getAllExams } from '@/services/content'
import { User, Score, Exam, Subject } from '@/types'
import toast from 'react-hot-toast'

export default function page() {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<Score[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, scoresData, examsData] = await Promise.all([
          getUserProfile(),
          getUserScores(),
          getAllExams()
        ]);
        setUser(userData);
        setScores(scoresData);
        setExams(examsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-slate-500">Loading dashboard...</div>;
  }

  // Calculate Stats
  const totalQuizzes = scores.length;
  const averageScore = totalQuizzes > 0
    ? Math.round(scores.reduce((acc, curr) => acc + curr.percentage, 0) / totalQuizzes)
    : 0;

  // Mock data for time spent and streak as API doesn't provide it yet
  const timeSpent = "4h 30m";
  const activeStreak = "3 Days";

  const recentActivity = scores.slice(0, 3);
  const recommendedExams = exams.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>Dashboard</h1>
          <p className='text-slate-500'>Welcome back, {user?.name || 'User'}!</p>
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
          value={totalQuizzes}
          icon={FiCheckCircle}
          color="blue"
          trend={{ value: totalQuizzes, isPositive: true }}
        />
        <StatsCard
          title="Average Score"
          value={`${averageScore}%`}
          icon={FiTrendingUp}
          color="main"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Time Spent"
          value={timeSpent}
          icon={FiClock}
          color="orange"
        />
        <StatsCard
          title="Active Streak"
          value={activeStreak}
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
              {recentActivity.length > 0 ? (
                recentActivity.map((score) => {
                  const exam = score.exam as Exam;
                  const subject = typeof exam?.subject === 'object' ? (exam.subject as Subject) : null;
                  const isPassed = score.percentage >= 50;

                  return (
                    <div key={score._id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {subject?.name?.substring(0, 2).toUpperCase() || 'EX'}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{exam?.title || 'Unknown Exam'}</h4>
                          <p className="text-xs text-slate-500">Completed on {new Date(score.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-slate-800">{score.percentage}%</span>
                        <span className={`text-xs ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{isPassed ? 'Passed' : 'Failed'}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500 text-center py-4">No recent activity.</p>
              )}
            </div>
          </DashboardCard>
        </div>

        {/* Recommended Quizzes - Takes up 1 column */}
        <div className="lg:col-span-1">
          <DashboardCard title="Recommended for You">
            <div className="space-y-4">
              {recommendedExams.map((exam) => (
                <div key={exam._id} className="group cursor-pointer">
                  <div className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{exam.title}</h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span>{exam.totalMarks} Marks</span>
                      <span>•</span>
                      <span>{exam.duration} mins</span>
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
