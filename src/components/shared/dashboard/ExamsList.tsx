"use client";

import { useState } from "react";
import { Exam } from "@/types";
import ExamCard from "./ExamCard";
import { FiChevronDown } from "react-icons/fi";

interface ExamsListProps {
  exams: Exam[];
}

export default function ExamsList({ exams }: ExamsListProps) {
  const [visibleCount, setVisibleCount] = useState(9);

  const visibleExams = exams.slice(0, visibleCount);
  const hasMore = visibleCount < exams.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        {visibleExams.map((exam) => (
          <ExamCard exam={exam} key={exam._id} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl transition-all duration-200"
        >
          <span>Load More Quizzes</span>
          <FiChevronDown />
        </button>
      )}
    </div>
  );
}
