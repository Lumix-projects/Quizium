import ExamCard from "@/components/shared/dashboard/ExamCard";
import { FiAlertCircle } from "react-icons/fi";
// import { Skeleton } from "@/components/shared/Skeleton";
import { getAllExams } from "@/services/content";
import DifficultyFilter from "@/components/shared/dashboard/DifficultyFilter";

export default async function QuizzesPage({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string }>;
}) {
  // Get Difficulty from Params - await the promise first
  const params = await searchParams;
  const difficulty = params.difficulty;

  // Fetch exams
  const exams = await getAllExams();

  // if (loading) {
  //   return (
  //     <div className="space-y-6">
  //       <div>
  //         <Skeleton className="h-8 w-48 mb-2" />
  //         <Skeleton className="h-5 w-64" />
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {[...Array(6)].map((_, i) => (
  //           <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
  //             <div className="p-6 space-y-4">
  //               <div className="flex items-start justify-between">
  //                 <Skeleton className="h-12 w-12 rounded-lg" />
  //                 <Skeleton className="h-6 w-16 rounded-full" />
  //               </div>
  //               <div className="space-y-2">
  //                 <Skeleton className="h-6 w-3/4" />
  //                 <Skeleton className="h-4 w-full" />
  //               </div>
  //               <div className="pt-4 flex items-center justify-between">
  //                 <Skeleton className="h-4 w-20" />
  //                 <Skeleton className="h-4 w-20" />
  //               </div>
  //               <Skeleton className="h-10 w-full rounded-md mt-4" />
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  if (!exams || exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <FiAlertCircle className="text-6xl text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground">
          No Quizzes Available
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          There are currently no quizzes available. Please check back later!
        </p>
      </div>
    );
  }

  // Get Filtered Exams
  const filteredExams = difficulty
    ? exams.filter((e) => e.difficulty === difficulty)
    : exams;

  return (
    <div className="space-y-6">
      {/* Exams Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
        {/* Exams Title */}
        <div className="text-center lg:text-start">
          <h1 className="text-2xl font-bold text-foreground">
            Available Quizzes
          </h1>
          <p className="text-muted-foreground">
            Test your knowledge with these quizzes
          </p>
        </div>

        {/* Exams Filter */}
        <DifficultyFilter current={difficulty} />
      </div>

      {/* Rendering Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <ExamCard key={exam._id} exam={exam} />
        ))}
      </div>
    </div>
  );
}
