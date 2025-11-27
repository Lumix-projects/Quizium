
import DashboardCard from "@/components/shared/dashboard/DashboardCard";
import StatsCard from "@/components/shared/dashboard/StatsCard";
import {
  FiTrendingUp,
  FiActivity,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { Skeleton } from "@/components/shared/Skeleton";
import { getUserProfile, getUserScores } from "@/services/user";
import { getAllExams } from "@/services/content";

export default async function HomePage() {
  const user = await getUserProfile();
  const scores = await getUserScores();
  const exams = await getAllExams();

  if (!user) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        {/* Stats Row Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Skeleton */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-3 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-transparent">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const timeSpent = "4h 30m";
  const activeStreak = "3 Days";

  const recentActivity = scores.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "User"}!
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Quizzes"
          value={exams.length}
          icon={FiCheckCircle}
          color="blue"
        />
        <StatsCard
          title="Average Score"
          value={`0%`}
          icon={FiTrendingUp}
          color="main"
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

      {/* Recent Activity */}
      <DashboardCard
        title="Recent Activity"
        action={
          <button className="text-sm text-primary font-medium hover:underline">
            View All
          </button>
        }
      >
        <div className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((score) => {
              const isPassed = score.percentage >= 50;

              return (
                <div
                  key={score._id}
                  className="flex items-center justify-between p-4 rounded-lg bg-card-hover hover:bg-muted/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${isPassed
                        ? "bg-success/10 text-success"
                        : "bg-error/10 text-error"
                        }`}
                    >
                      {isPassed ? (
                        <FiCheckCircle className="text-lg" />
                      ) : (
                        <FiClock className="text-lg" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Quiz Attempt
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Completed on{" "}
                        {new Date(score.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-foreground">
                      {score.percentage}%
                    </span>
                    <span
                      className={`text-xs font-medium ${isPassed ? "text-success" : "text-error"
                        }`}
                    >
                      {isPassed ? "Passed" : "Failed"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No recent activity.
            </p>
          )}
        </div>
      </DashboardCard>
    </div>
  );
}
