import { Exam, User } from "@/types";
import { cn } from "@/lib/utils";
import {
  FiClock,
  FiTrendingUp,
  FiPlay,
  FiUser,
  FiCalendar,
  FiEye,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import Link from "next/link";

interface ExamCardProps {
  exam: Exam & {
    canTakeExam?: boolean;
    remainingAttempts?: number;
    isPassed?: boolean;
  };
}

// Format creation date into human-friendly text
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-US", {
    // Fallback to full date
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Returns Tailwind colors based on exam difficulty level
const getDifficultyStyles = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-200",
        label: "Beginner",
      };
    case "intermediate":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-200",
        label: "Intermediate",
      };
    case "advanced":
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-200",
        label: "Advanced",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-200",
        label: "Unknown",
      };
  }
};

// Card component that displays exam info
export default function ExamCard({ exam }: ExamCardProps) {
  // Resolve the creator's name (string OR User object)
  const creatorName =
    typeof exam.createdBy === "string"
      ? "Unknown"
      : (exam.createdBy as User).name;

  // Difficulty badge styles based on exam difficulty
  const difficultyStyles = getDifficultyStyles(exam.difficulty);

  // Determine if user can take the exam
  const canTakeExam = exam.canTakeExam ?? true;
  const remainingAttempts = exam.remainingAttempts ?? 2;
  const isPassed = exam.isPassed ?? false;

  return (
    <div className="rounded-xl shadow-md transition-all duration-300 overflow-hidden border border-border group bg-background hover:shadow-xl hover:border-primary/20 flex flex-col">
      {/* Card Header: title + creator name */}
      <div className="p-6 border-b border-border bg-linear-to-br from-primary/10 to-transparent space-y-2">
        {/* Exam title */}
        <h3 className="text-xl font-bold text-foreground line-clamp-1 transition-colors duration-300 group-hover:text-primary">
          {exam.title}
        </h3>

        {/* Creator info and Difficulty badge */}
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          {/* Creator info */}
          <h6 className="flex items-center gap-2">
            <FiUser className="w-4 h-4" />
            <span>{creatorName}</span>
          </h6>

          {/* Difficulty badge */}
          <span
            className={cn(
              "shrink-0 px-3 py-1 rounded-full font-semibold border text-xs",
              difficultyStyles.bg,
              difficultyStyles.text,
              difficultyStyles.border
            )}
          >
            {difficultyStyles.label}
          </span>
        </div>
      </div>

      {/* Body: description + stats */}
      <div className="p-6 space-y-4 flex-1">
        {/* Exam description */}
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {exam.description}
        </p>

        {/* Stats section: duration & total marks */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Duration box */}
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-primary/5 border-primary/20">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FiClock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Duration
              </p>
              <p className="text-sm font-bold text-foreground">
                {exam.duration} min
              </p>
            </div>
          </div>

          {/* Points box */}
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/5 border-secondary/20">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Points
              </p>
              <p className="text-sm font-bold text-foreground">
                {exam.totalMarks}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: creation date + attempts info + button */}
      <div className="px-6 py-4 flex items-start justify-between border-t border-border bg-border/20">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FiCalendar className="w-4 h-4" />
            <span>{formatDate(exam.createdAt)}</span>
          </div>

          {/* Status badge - shows passed status instead of attempts if passed */}
          {isPassed ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                <FiCheckCircle className="w-3.5 h-3.5" />
                <span>Passed</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  remainingAttempts > 1
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : remainingAttempts === 1
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {!canTakeExam && remainingAttempts === 0 && (
                  <FiAlertCircle className="w-3.5 h-3.5 mr-0.5" />
                )}
                <span className="font-bold">{remainingAttempts}</span>
                <span>attempt{remainingAttempts !== 1 ? "s" : ""} left</span>
              </div>
            </div>
          )}
        </div>

        {/* Conditional button based on isPassed and canTakeExam */}
        {isPassed ? (
          /* View Answers button - when passed */
          <Link
            href={`/answers/${exam._id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer bg-green-500 text-white shadow-sm hover:bg-green-600 hover:shadow-md active:scale-95 transition-all duration-300"
          >
            <FiCheckCircle className="w-4 h-4" />
            View Results
          </Link>
        ) : canTakeExam ? (
          /* Start Quiz button - enabled */
          <Link
            href={`/exam/${exam._id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all duration-300"
          >
            <FiPlay className="w-4 h-4" />
            Start Quiz
          </Link>
        ) : (
          /* View Answers button - when attempts exhausted */
          <Link
            href={`/answers/${exam._id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer bg-gray-200 text-gray-700 shadow-sm hover:bg-gray-300 hover:shadow-md active:scale-95 transition-all duration-300"
          >
            <FiEye className="w-4 h-4" />
            View Answers
          </Link>
        )}
      </div>
    </div>
  );
}
