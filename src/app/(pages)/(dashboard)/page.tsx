import {
  getUserScoresServer,
  getUserProfileCached,
} from "@/services/server/userServer";
import { getAllExamsCached } from "../exam/_shared/services/exam";
import FeaturedExams from "./_components/FeaturedExams";

export default async function HomePage() {
  // Fetch user, scores & exams
  const [exams, { user }, scores] = await Promise.all([
    getAllExamsCached({ limit: 3 }),
    getUserProfileCached(),
    getUserScoresServer(),
  ]);

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

      {/* Featured Exams Component */}
      <FeaturedExams exams={exams} />
    </div>
  );
}
