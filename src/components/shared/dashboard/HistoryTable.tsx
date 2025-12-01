import {
  FiCheckCircle,
  FiXCircle,
  FiAward,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";

interface Exam {
  _id: string;
  title?: string;
}

interface Score {
  _id: string;
  exam: string | Exam;
  createdAt: string;
  score: number;
  totalMarks: number;
  percentage: number;
  attemptNumber: number;
}

interface HistoryTableProps {
  scores: Score[];
}

export default function HistoryTable({ scores }: HistoryTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getExamTitle = (exam: string | Exam): string => {
    if (typeof exam === "string") {
      return "Quiz Attempt";
    }
    return exam.title || "Quiz Attempt";
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-500";
    if (percentage >= 70) return "text-blue-500";
    if (percentage >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      {/* Cards Grid for Mobile/Tablet */}
      <div className="lg:hidden space-y-4">
        {scores.map((score) => {
          const isPassed = score.percentage >= 50;

          return (
            <div
              key={score._id}
              className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {getExamTitle(score.exam)}
                  </h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <FiCalendar className="text-xs" />
                    <span>{formatDate(score.createdAt)}</span>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                    isPassed ? "bg-success/10" : "bg-error/10"
                  }`}
                >
                  {isPassed ? (
                    <>
                      <FiCheckCircle className="text-success text-sm" />
                      <span className="text-sm font-semibold text-success">
                        Passed
                      </span>
                    </>
                  ) : (
                    <>
                      <FiXCircle className="text-error text-sm" />
                      <span className="text-sm font-semibold text-error">
                        Failed
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    {score.score}
                    <span className="text-xl text-muted-foreground">
                      /{score.totalMarks}
                    </span>
                  </div>
                  <div
                    className={`text-sm font-semibold ${getGradeColor(
                      score.percentage
                    )}`}
                  >
                    {score.percentage.toFixed(1)}% Score
                  </div>
                </div>
                <div>
                  <span>Attemp number</span>
                  {score.attemptNumber}
                </div>
              </div>

              <a
                href={`/exam/${
                  typeof score.exam === "string" ? score.exam : score.exam._id
                }/result/answers`}
                className="main-btn block w-full text-center"
              >
                View Answers
              </a>
            </div>
          );
        })}
      </div>

      {/* Table for Desktop */}
      <div className="hidden lg:block bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Quiz Title
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Date Taken
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Score
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scores.map((score) => {
                const isPassed = score.percentage >= 50;

                return (
                  <tr
                    key={score._id}
                    className="hover:bg-card-hover transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <FiAward className="text-primary text-lg" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {getExamTitle(score.exam)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FiCalendar className="text-xs" />
                        <span className="text-sm">
                          {formatDate(score.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-foreground">
                          {score.score}
                          <span className="text-sm text-muted-foreground">
                            /{score.totalMarks}
                          </span>
                        </span>
                        <span
                          className={`text-xs font-semibold ${getGradeColor(
                            score.percentage
                          )}`}
                        >
                          {score.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          isPassed
                            ? "bg-success/10 text-success"
                            : "bg-error/10 text-error"
                        }`}
                      >
                        {isPassed ? (
                          <>
                            <FiCheckCircle className="text-sm" />
                            Passed
                          </>
                        ) : (
                          <>
                            <FiXCircle className="text-sm" />
                            Failed
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <a
                        href={`/exam/${
                          typeof score.exam === "string"
                            ? score.exam
                            : score.exam._id
                        }/result/answers`}
                        className="main-btn inline-block w-fit ms-auto"
                      >
                        View Answers
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {scores.length === 0 && (
        <div className="bg-card rounded-2xl shadow-sm border border-border p-12 text-center">
          <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAward className="text-4xl text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            No quizzes taken yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start taking quizzes to see your history here
          </p>
          <a href="/exams" className="main-btn inline-block">
            Browse Quizzes
          </a>
        </div>
      )}
    </>
  );
}
