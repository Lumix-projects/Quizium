import { CircleQuestionMark, Play } from "lucide-react";
import { Exam } from "../../exam/_shared/types/exam";
import Link from "next/link";

export default function ExamCard({ exam }: { exam: Exam }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      {/* Logo and Details Wrapper */}
      <div className="flex gap-3">
        {/* Logo */}
        <span className="inline-flex bg-primary/50 text-white items-center justify-center p-2 w-10 h-10 rounded-full">
          <CircleQuestionMark />
        </span>

        {/* Exam Details */}
        <div className="max-w-sm">
          <h5 className="font-medium">{exam.title}</h5>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {exam.description}
          </p>
        </div>
      </div>

      <Link
        href={`/exam/${exam._id}`}
        className="ms-auto text-sm w-full md:w-fit cursor-pointer transition-all duration-300 active:scale-95 font-medium text-center flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-hover rounded-lg py-2.5 px-4"
      >
        <Play size={18} /> Start Exam
      </Link>
    </div>
  );
}
