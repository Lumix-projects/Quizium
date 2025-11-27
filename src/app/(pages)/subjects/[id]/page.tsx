import { FiBook, FiLayers } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import {
  getAllTopics,
  getExamBySubject,
  getSubjectById,
} from "@/services/content";
import ExamCard from "@/components/shared/dashboard/ExamCard";

export const revalidate = 600;

export default async function SubjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Extract the subject ID from the route parameters
  const { id } = await params;

  // Fetch the subject details, associated topics, and exams concurrently
  const [subject, topics, exams] = await Promise.all([
    getSubjectById(id),
    getAllTopics(id),
    getExamBySubject(id),
  ]);

  // Handle the case where the ID parameter is missing
  if (!id) {
    return (
      <div className="max-w-5xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-foreground">
          Invalid subject ID
        </h1>
      </div>
    );
  }

  // Handle the case where no subject exists for the given ID
  if (!subject) {
    return (
      <div className="max-w-5xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-foreground">
          Subject not found
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm max-w-7xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Subject Description and Topics */}
          <div className="md:col-span-2 space-y-8">
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

            {/* Topics Section */}
            {topics.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Topics
                </h2>
                <div className="grid gap-4">
                  {topics.map((topic) => (
                    <Link
                      href={`/user/subjects/${id}/${topic.id}`}
                      key={topic.id}
                      className="block"
                    >
                      <div className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-foreground">
                            {topic.title}
                          </h3>
                          {topic.tags && topic.tags.length > 0 && (
                            <div className="flex gap-2">
                              {topic.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {topic.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/10 rounded-xl border border-dashed border-border">
                <p className="text-muted-foreground">
                  No topics available for this subject yet.
                </p>
              </div>
            )}
          </div>

          {/* Quick Status Box */}
          <div className="bg-muted/30 rounded-xl p-6 h-fit border border-border/50">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <FiBook className="text-primary" />
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="text-muted-foreground text-sm">Status</span>
                <span className="font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="text-muted-foreground text-sm">Topics</span>
                <span className="font-medium text-foreground text-sm">
                  {topics.length}
                </span>
              </div>
            </div>
          </div>

          {/* Subject Quizzes */}
          <h2 className="text-xl font-semibold text-foreground mt-4">
            Subject Quizzes
          </h2>
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
            {exams.map((exam) => (
              <ExamCard exam={exam} key={exam._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
