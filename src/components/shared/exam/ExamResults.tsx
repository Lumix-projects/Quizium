import React from "react";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Award,
  Calendar,
  Target,
} from "lucide-react";
import { ExamSubmitResponse } from "@/types/exam";
import { cn } from "@/lib/utils";
import BackBtn from "../BackBtn";

const ExamResults = ({ data }: { data: ExamSubmitResponse }) => {
  const { message, result, comparison } = data;
  const {
    score,
    totalMarks,
    percentage,
    attemptNumber,
    isRetake,
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
  } = result;

  const getGradeColor = (percent: number) => {
    if (percent >= 90) return "text-success";
    if (percent >= 75) return "text-primary";
    if (percent >= 60) return "text-warning";
    return "text-error";
  };

  const getGradeLabel = (percent: number) => {
    if (percent >= 90) return "Excellent";
    if (percent >= 75) return "Good";
    if (percent >= 60) return "Fair";
    return "Needs Improvement";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={cn(
        "mx-auto space-y-6",
        comparison?.previousAttempt ? "max-w-6xl" : "max-w-3xl"
      )}
    >
      {/* Back Button */}
      <BackBtn />

      {/* Result Content */}
      <div
        className={cn(
          comparison?.previousAttempt
            ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
            : "flex flex-col items-center gap-6"
        )}
      >
        <div className="w-full max-w-3xl flex flex-col gap-6">
          {/* Header Message */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {message}
            </h2>
            {isRetake && (
              <p className="text-muted-foreground text-sm">
                Attempt #{attemptNumber}
              </p>
            )}
          </div>

          {/* Main Score Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-center mb-6">
              <div
                className={`text-3xl md:text-6xl font-bold ${getGradeColor(
                  percentage
                )} mb-2`}
              >
                {percentage.toFixed(1)}%
              </div>
              <div className="text-xl md:text-2xl text-foreground font-semibold mb-1">
                {score} / {totalMarks}
              </div>
              <div
                className={`inline-block px-4 py-1.5 rounded-full text-sm ${getGradeColor(
                  percentage
                )} bg-opacity-10 font-medium`}
              >
                {getGradeLabel(percentage)}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="w-full bg-input rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${
                  percentage >= 90
                    ? "bg-success"
                    : percentage >= 75
                    ? "bg-primary"
                    : percentage >= 60
                    ? "bg-warning"
                    : "bg-error"
                } transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-success">
                  {correctAnswers}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Correct
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-error">
                  {incorrectAnswers}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Incorrect
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-foreground">
                  {totalQuestions}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Total</div>
              </div>
            </div>
          </div>

          {/* Render Review Answers if there is no Previous Attempt */}
          {!comparison?.previousAttempt && (
            <button className="main-btn">Review Answers</button>
          )}
        </div>

        {/* Comparison Section */}
        {comparison?.previousAttempt && comparison?.improvement && (
          <div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4 self-start mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Performance Comparison
              </h3>

              {/* Previous Attempt */}
              <div className="bg-input/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Previous Attempt
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comparison.previousAttempt.completedAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="md:text-xl font-bold text-foreground">
                    {comparison.previousAttempt.score} / {totalMarks}
                  </span>
                  <span className="text-lg font-semibold text-secondary">
                    {comparison.previousAttempt.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Improvement Stats */}
              <div
                className={`rounded-lg p-4 ${
                  comparison.improvement.status === "improved"
                    ? "bg-success/10"
                    : comparison.improvement.status === "declined"
                    ? "bg-error/10"
                    : "bg-warning/10"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {comparison.improvement.status === "improved" ? (
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-success" />
                      </div>
                    ) : comparison.improvement.status === "declined" ? (
                      <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-error" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-warning" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-foreground capitalize">
                        {comparison.improvement.status}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {comparison.improvement.status === "improved"
                          ? "Great job!"
                          : comparison.improvement.status === "declined"
                          ? "Keep practicing"
                          : "Same as before"}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-lg md:text-2xl font-bold ${
                        comparison.improvement.status === "improved"
                          ? "text-success"
                          : comparison.improvement.status === "declined"
                          ? "text-error"
                          : "text-warning"
                      }`}
                    >
                      {comparison.improvement.percentage > 0 ? "+" : ""}
                      {comparison.improvement.percentage.toFixed(1)}%
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {comparison.improvement.score > 0 ? "+" : ""}
                      {comparison.improvement.score} marks
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="main-btn">Review Answers</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamResults;
