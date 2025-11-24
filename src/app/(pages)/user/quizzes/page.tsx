"use client";

import React from "react";
import { useExams } from "@/hooks/useSubject";
import ExamCard from "@/components/shared/dashboard/ExamCard";
import { FiAlertCircle } from "react-icons/fi";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function QuizzesPage() {
  const { exams, loading } = useExams();

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Available Quizzes
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge with these quizzes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <ExamCard
            key={exam._id}
            exam={exam}
            onStart={(id) => console.log("Start exam:", id)}
          />
        ))}
      </div>
    </div>
  );
}
