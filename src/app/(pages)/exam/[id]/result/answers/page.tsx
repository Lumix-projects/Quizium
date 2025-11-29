/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { getResultServer } from "@/services/server/examServer";

export default async function Answers({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getResultServer(id as string);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Exam Results
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {result.score}
            </div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {result.totalMarks}
            </div>
            <div className="text-sm text-muted-foreground">Total Marks</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {result.percentage}%
            </div>
            <div className="text-sm text-muted-foreground">Percentage</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {result.answers.length}
            </div>
            <div className="text-sm text-muted-foreground">Questions</div>
          </div>
        </div>

        <div className="space-y-6">
          {result.answers.map((answerItem: any, index: number) => {
            const question = answerItem.question;
            const userAnswer = answerItem.selectedAnswer;
            const correctAnswer = question.correctAnswer;
            const isCorrect = userAnswer === correctAnswer;

            return (
              <div
                key={question._id}
                className={cn(
                  "border-2 rounded-xl p-4 md:p-6 space-y-4",
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold",
                      isCorrect ? "bg-green-500" : "bg-red-500"
                    )}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground wrap-break-word">
                        {question.questionText}
                      </h3>
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-sm font-medium self-start whitespace-nowrap",
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        )}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {question.options.map(
                        (option: string, optIndex: number) => {
                          const isSelected = userAnswer === optIndex;
                          const isCorrectOption = correctAnswer === optIndex;

                          return (
                            <div
                              key={optIndex}
                              className={cn(
                                "w-full text-left p-3 rounded-lg border-2 transition-all",
                                isCorrectOption
                                  ? "border-green-500 bg-green-100 font-medium"
                                  : isSelected
                                  ? "border-red-500 bg-red-100 font-medium"
                                  : "border-border bg-background/50"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={cn(
                                    "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                                    isCorrectOption
                                      ? "border-green-500 bg-green-500"
                                      : isSelected
                                      ? "border-red-500 bg-red-500"
                                      : "border-muted-foreground/30"
                                  )}
                                >
                                  {(isCorrectOption || isSelected) && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                <span
                                  className={cn(
                                    "wrap-break-word",
                                    isCorrectOption
                                      ? "text-green-700"
                                      : isSelected
                                      ? "text-red-700"
                                      : "text-foreground/70"
                                  )}
                                >
                                  {option}
                                  {isCorrectOption && " ✓"}
                                  {isSelected && !isCorrectOption && " ✗"}
                                </span>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
