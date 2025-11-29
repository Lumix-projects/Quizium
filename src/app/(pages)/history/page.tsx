import DashboardCard from "@/components/shared/dashboard/DashboardCard";
import HistoryTable from "@/components/shared/dashboard/HistoryTable";
import { getUserScoresServer } from "@/services/server/userServer";

export default async function HistoryPage() {
  const scores = await getUserScoresServer();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">History</h1>
          <p className="text-slate-500">
            View your past quiz attempts and scores
          </p>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-bold text-slate-800">
            {scores.length}
          </span>
          <span className="text-xs text-slate-500">Total Attempts</span>
        </div>
      </div>

      <DashboardCard title="Quiz History">
        <HistoryTable scores={scores} />
      </DashboardCard>
    </div>
  );
}
