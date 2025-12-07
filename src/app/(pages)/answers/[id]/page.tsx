/* eslint-disable @typescript-eslint/no-explicit-any */
import BackBtn from "@/components/ui/BackBtn";
import { cn } from "@/lib/utils";
import { getAnswersServer } from "@/services/server/examServer";
import Link from "next/link";

export default async function Answers({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const result = await getAnswersServer(id as string);

    // Check if result exists
    if (!result.result) {
      return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
          <BackBtn to="/history" label="Go to History" />

          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm text-center">
            <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📝</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              No Exam Results Found
            </h1>

            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven&apos;t taken this exam yet. Complete the exam first to
              view your answers and results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/exam/${id}`}
                className="px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all duration-300"
              >
                Take Exam Now
              </Link>
              <Link
                href="/quizzes"
                className="px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer bg-gray-200 text-gray-700 shadow-sm hover:bg-gray-300 hover:shadow-md active:scale-95 transition-all duration-300"
              >
                Browse More Exams
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Display the exam results (existing code)
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <BackBtn to="/history" label="Go to History" />

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {result.result.exam?.title || "Exam Results"}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Attempt {result.result.attemptNumber}</span>
                <span>•</span>
                <span>
                  {new Date(
                    result.result.completedAt || result.result.createdAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                result.result.percentage >= 50
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {result.result.percentage >= 50 ? "Passed" : "Failed"}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {result.result.score}
              </div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {result.result.totalMarks}
              </div>
              <div className="text-sm text-muted-foreground">Total Marks</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {result.result.percentage}%
              </div>
              <div className="text-sm text-muted-foreground">Percentage</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {result.result.answers.length}
              </div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {result.result.answers.map((answerItem: any, index: number) => {
              const question = answerItem.question;
              const userAnswer = answerItem.selectedAnswer;
              const correctAnswer = question.correctAnswer;
              const isAnswered =
                userAnswer !== null && userAnswer !== undefined;
              const isCorrect = isAnswered && userAnswer === correctAnswer;
              const isNotAnswered = !isAnswered;

              return (
                <div
                  key={question._id}
                  className={cn(
                    "border rounded-xl p-4 md:p-6 space-y-4 h-full flex flex-col",
                    isNotAnswered
                      ? "border-yellow-500/50 bg-yellow-500/5"
                      : isCorrect
                      ? "border-green-500/50 bg-green-500/5"
                      : "border-red-500/50 bg-red-500/5"
                  )}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={cn(
                        "shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold text-sm shadow-sm",
                        isNotAnswered
                          ? "bg-yellow-500"
                          : isCorrect
                          ? "bg-green-500"
                          : "bg-red-500"
                      )}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col h-full">
                      <div className="flex flex-col gap-2 mb-4">
                        <h3 className="text-base font-semibold text-foreground leading-snug">
                          {question.questionText}
                        </h3>
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-medium self-start whitespace-nowrap border",
                            isNotAnswered
                              ? "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
                              : isCorrect
                              ? "bg-green-500/10 text-green-700 border-green-500/20"
                              : "bg-red-500/10 text-red-700 border-red-500/20"
                          )}
                        >
                          {isNotAnswered
                            ? "Not Answered"
                            : isCorrect
                            ? "Correct"
                            : "Incorrect"}
                        </span>
                      </div>

                      <div className="space-y-2.5 flex-1">
                        {question.options.map(
                          (option: string, optIndex: number) => {
                            const isSelected = userAnswer === optIndex;
                            const isCorrectOption = correctAnswer === optIndex;

                            return (
                              <div
                                key={optIndex}
                                className={cn(
                                  "w-full text-left p-3 rounded-lg border transition-all text-sm",
                                  isCorrectOption
                                    ? "border-green-500/50 bg-green-500/10 font-medium"
                                    : isSelected
                                    ? "border-red-500/50 bg-red-500/10 font-medium"
                                    : "border-border/50 bg-background/50"
                                )}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={cn(
                                      "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                                      isCorrectOption
                                        ? "border-green-500 bg-green-500"
                                        : isSelected
                                        ? "border-red-500 bg-red-500"
                                        : "border-muted-foreground/30"
                                    )}
                                  >
                                    {(isCorrectOption || isSelected) && (
                                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                  </div>
                                  <span
                                    className={cn(
                                      "leading-tight",
                                      isCorrectOption
                                        ? "text-green-700"
                                        : isSelected
                                        ? "text-red-700"
                                        : "text-foreground/80"
                                    )}
                                  >
                                    {option}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>

                      {/* Show message if not answered */}
                      {isNotAnswered && (
                        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <p className="text-xs text-yellow-800 font-medium flex items-center gap-1.5">
                            <span>⚠️</span> You did not answer this question.
                          </p>
                          <p className="text-xs text-yellow-700 mt-1 pl-5">
                            <span className="font-medium">Correct answer:</span>{" "}
                            {question.options[correctAnswer]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    // Handle any other errors
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <BackBtn to="/history" label="Go to History" />

        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">
            Error Loading Results
          </h1>
          <p className="text-muted-foreground mb-6">
            {error.message ||
              "An error occurred while loading the exam results."}
          </p>
          <a
            href="/history"
            className="px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all duration-300"
          >
            Go Back to History
          </a>
        </div>
      </div>
    );
  }
}
