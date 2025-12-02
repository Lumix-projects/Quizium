import { FiBook, FiLayers, FiCheckCircle, FiClock } from "react-icons/fi";
import Image from "next/image";

import { getAllTopics, getSubjectById } from "@/services/content";

import DifficultyFilter from "@/components/shared/dashboard/DifficultyFilter";
import TopicsList from "@/components/shared/dashboard/TopicsList";
import ExamsList from "@/components/shared/dashboard/ExamsList";
import BackBtn from "@/components/ui/BackBtn";
import { getExamBySubject } from "@/services/server/userServer";

export const revalidate = 600;

export default async function SubjectDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { difficulty?: string };
}) {
  // Get ID from Params
  const { id } = await params;

  // Get Difficulty from Params
  const { difficulty } = await searchParams;

  // Fetch subject, topics & exams
  const [subject, topics, exams] = await Promise.all([
    getSubjectById(id),
    getAllTopics(id),
    getExamBySubject(id),
  ]);

  if (!id) {
    return (
      <div className="max-w-5xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-foreground">
          Invalid subject ID
        </h1>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="max-w-5xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-foreground">
          Subject not found
        </h1>
      </div>
    );
  }

  // Get Filtered Exams
  const filteredExams = difficulty
    ? exams.filter((e) => e.difficulty === difficulty)
    : exams;

  return (
    <section className="max-w-7xl mx-auto">
      <div className="mb-4">
        <BackBtn />
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Subject Image */}
        <div className="relative h-64 md:h-96 bg-muted/20">
          {subject.image ? (
            <Image
              src={subject.image}
              alt={subject.title || "Subject Image"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/10 text-muted">
              <FiBook className="text-6xl opacity-20" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 md:p-8 text-white w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {subject.title}
              </h1>

              <div className="flex items-center gap-4 text-sm md:text-base opacity-90">
                <span className="flex items-center gap-1">
                  <FiLayers />
                  Subject Details
                </span>

                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiBook />
                    {topics.length} Topics
                  </span>
                </>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Content */}
        <div className="p-6 md:p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Subject Description and Topics */}
            <div className="col-span-3 lg:col-span-2 space-y-8 w-full">
              {/* Subject Description */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  About this Subject
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {subject.description ||
                    "No description available for this subject."}
                </p>
              </div>

              {/* Topics */}
              {topics.length > 0 ? (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Topics
                  </h2>
                  <TopicsList topics={topics} subjectId={id} />
                </div>
              ) : (
                <div className="text-center py-8 bg-muted/10 rounded-xl border border-dashed border-border">
                  <p className="text-muted-foreground">
                    No topics available yet.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="col-span-3 lg:col-span-1 bg-card rounded-xl p-4 md:p-6 h-fit border border-border shadow-sm">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <FiBook className="text-primary" />
                Quick Stats
              </h3>

              <div className="space-y-3">
                {/* Status */}
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <span className="text-muted-foreground text-sm font-medium">
                    Status
                  </span>
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      subject.status === "available"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {subject.status === "available" ? (
                      <>
                        <FiCheckCircle className="w-3 h-3" />
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <FiClock className="w-3 h-3" />
                        <span>Upcoming</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <span className="text-muted-foreground text-sm font-medium">
                    Topics
                  </span>
                  <span className="font-semibold text-foreground text-base">
                    {topics.length}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <span className="text-muted-foreground text-sm font-medium">
                    Exams
                  </span>
                  <span className="font-semibold text-foreground text-base">
                    {exams.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Subject Quizzes Section */}
            <div className="col-span-3 my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Subject Quizzes header */}
              <h2 className="text-xl font-semibold text-foreground">
                Subject Quizzes
              </h2>

              {/* Difficulty Filter */}
              <DifficultyFilter current={difficulty} />
            </div>

            {/* Exams List */}
            <div className="col-span-3 w-full">
              <ExamsList exams={filteredExams} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
