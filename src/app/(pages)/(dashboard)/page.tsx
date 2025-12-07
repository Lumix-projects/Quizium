import {
  getUserScoresServer,
  getUserProfileCached,
} from "@/services/server/userServer";
import { getAllExamsCached } from "../exam/_shared/services/exam";
import FeaturedExams from "./_components/FeaturedExams";
import Header from "./_components/Header";
import UserProfileSummary from "./_components/UserProfileSummary";
import LeaderboardRank from "./_components/LeaderboardRank";
import RecentActivity from "./_components/RecentActivity";
import FeaturedSubjects from "./_components/FeaturedSubjects";
import { getAllSubjectsCached } from "../subjects/_shared/services/subject";

export default async function HomePage() {
  // Fetch user, scores, exams & subjects
  const [exams, { user }, scores, subjects] = await Promise.all([
    getAllExamsCached({ limit: 3 }),
    getUserProfileCached(),
    getUserScoresServer(),
    getAllSubjectsCached({ limit: 4, status: "available" }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Header user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
          {/* Featured Exams Component */}
          <FeaturedExams exams={exams} />

          {/* Recent Activity */}
          <RecentActivity scores={scores} />
        </div>

        <div className="self-start flex flex-col gap-8">
          {/* User Analytics */}
          <UserProfileSummary user={user} />

          {/* Leaderboard Rank */}
          <LeaderboardRank user={user} />
        </div>
      </div>

      {/* Featured Subjects */}
      <FeaturedSubjects subjects={subjects} />
    </div>
  );
}
