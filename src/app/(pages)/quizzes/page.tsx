"use client";

import React from "react";
import { useExams } from "@/hooks/useSubject";
import ExamCard from "@/components/shared/dashboard/ExamCard";
import { FiAlertCircle } from "react-icons/fi";
import { Skeleton } from "@/components/shared/Skeleton";

export default function QuizzesPage() {
  const { exams, loading } = useExams();

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-10 w-full rounded-md mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
