import SubjectCard from "@/components/shared/dashboard/SubjectCard";
import DashboardCard from "@/components/shared/dashboard/DashboardCard";
import { FiLayers } from "react-icons/fi";
import { Skeleton } from "@/components/shared/Skeleton";
import { getAllSubjects } from "@/services/content";

export default async function SubjectsPage() {
  const subjects = await getAllSubjects();

  if (!subjects) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Subjects Grid Skeleton */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col"
                >
                  <Skeleton className="h-40 w-full" />
                  <div className="p-5 space-y-3 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <Skeleton className="h-9 rounded-md" />
                      <Skeleton className="h-9 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-800">Subjects</h1>
        <p className="text-slate-500">
          Explore all available subjects and their quizzes.
        </p>
      </div>

      {/* Subjects Grid */}
      <DashboardCard
        title="All Subjects"
        action={
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FiLayers />
            <span>{subjects.length} Subjects</span>
          </div>
        }
      >
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id || subject._id} subject={subject} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <FiLayers className="text-4xl mx-auto mb-4 opacity-20" />
            <p>No subjects found.</p>
          </div>
        )}
      </DashboardCard>
    </div>
  );
}
