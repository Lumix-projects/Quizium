import { Exam, User } from "@/types";
import { cn } from "@/lib/utils";
import {
  FiClock,
  FiTrendingUp,
  FiPlay,
  FiUser,
  FiCalendar,
} from "react-icons/fi";

interface ExamCardProps {
  exam: Exam;
  onStart?: (examId: string) => void;
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
export default function ExamCard({ exam, onStart }: ExamCardProps) {
  // Resolve the creator's name (string OR User object)
  const creatorName =
    typeof exam.createdBy === "string"
      ? "Unknown"
      : (exam.createdBy as User).name;

  // Difficulty badge styles based on exam difficulty
  const difficultyStyles = getDifficultyStyles(exam.difficulty);

  return (
    <div className="rounded-xl shadow-md transition-all duration-300 overflow-hidden border border-border group bg-background hover:shadow-xl hover:border-primary/20">
      {/* Card Header: title + creator name */}
      <div className="p-6 border-b border-border bg-linear-to-br from-primary/10 to-transparent">
        {/* Exam title and difficulty badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold text-foreground line-clamp-2 transition-colors duration-300 group-hover:text-primary">
            {exam.title}
          </h3>

          {/* Difficulty badge */}
          <span
            className={cn(
              "shrink-0 px-3 py-1 rounded-full text-xs font-semibold border",
              difficultyStyles.bg,
              difficultyStyles.text,
              difficultyStyles.border
            )}
          >
            {difficultyStyles.label}
          </span>
        </div>

        {/* Creator info */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FiUser className="w-4 h-4" />
          <span>{creatorName}</span>
        </div>
      </div>

      {/* Body: description + stats */}
      <div className="p-6 space-y-4">
        {/* Exam description */}
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {exam.description}
        </p>

        {/* Stats section: duration & total marks */}
        <div className="grid grid-cols-2 gap-4">
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
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-purple-50 border-purple-100 dark:bg-purple-600 dark:border-purple-700">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-purple-600" />
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

      {/* Footer: creation date + start button */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-border bg-border/20">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FiCalendar className="w-4 h-4" />
          <span>{formatDate(exam.createdAt)}</span>
        </div>

        {/* Start exam button */}
        {onStart && (
          <button
            onClick={() => onStart(exam._id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all duration-300"
          >
            <FiPlay className="w-4 h-4" />
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
}
