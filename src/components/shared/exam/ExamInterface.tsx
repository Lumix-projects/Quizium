"use client";

import { Question } from "@/types";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface ExamInterfaceProps {
    questions: Question[];
    examId: string;
}

export default function ExamInterface({ questions, examId }: ExamInterfaceProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [isFlagged, setFlagged] = useState<Record<string, boolean>>({});
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion._id]: optionIndex,
        }));

        if (isFlagged[currentQuestion._id]) {
            setFlagged((prev) => ({
                ...prev,
                [currentQuestion._id]: false,
            }));
        }

        handleNext();
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleFlagToggle = () => {
        const id = currentQuestion._id;
        const isCurrentlyFlagged = isFlagged[id];

        setFlagged((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));

        if (!isCurrentlyFlagged && !isLastQuestion) {
            handleNext();
        }
    };

    const handleSubmit = () => {
        console.log("Submitting answers:", answers);
    };

    if (!currentQuestion && !isReviewMode) {
        return <div>No questions available.</div>;
    }

    // Review Mode View
    if (isReviewMode) {
        return (
            <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Review Your Answers
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        Please review your answers before submitting the exam.
                    </p>

                    <div className="space-y-6">
                        {questions.map((question, index) => {
                            const userAnswer = answers[question._id];
                            const hasAnswer = userAnswer !== undefined;

                            return (
                                <div
                                    key={question._id}
                                    className="bg-muted/30 border border-border rounded-xl p-6 space-y-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-foreground mb-3">
                                                {question.questionText}
                                            </h3>
                                            <div className="space-y-2">
                                                {question.options.map((option, optIndex) => {
                                                    const isSelected = userAnswer === optIndex;
                                                    return (
                                                        <div
                                                            key={optIndex}
                                                            className={cn(
                                                                "p-3 rounded-lg border-2 transition-all",
                                                                isSelected
                                                                    ? "border-primary bg-primary/10 font-medium"
                                                                    : "border-border bg-background/50"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className={cn(
                                                                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                                                                        isSelected
                                                                            ? "border-primary bg-primary"
                                                                            : "border-muted-foreground/30"
                                                                    )}
                                                                >
                                                                    {isSelected && (
                                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                                    )}
                                                                </div>
                                                                <span
                                                                    className={cn(
                                                                        isSelected
                                                                            ? "text-primary"
                                                                            : "text-foreground/70"
                                                                    )}
                                                                >
                                                                    {option}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );

                                                })}
                                                {isFlagged[question._id] && (
                                                    <span className="flex items-center gap-1 text-sm text-yellow-600 font-medium">
                                                       <TriangleAlert /> Flagged Question
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                        <button
                            onClick={() => setIsReviewMode(false)}
                            className="flex-1 px-6 py-3 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-colors"
                        >
                            Back to Questions
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                        >
                            <FiCheckCircle className="text-xl" />
                            Submit Exam
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </span>
                            <span>
                                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                                Completed
                            </span>
                        </div>
                        <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-out"
                                style={{
                                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                            {currentQuestion.questionText}
                        </h2>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = answers[currentQuestion._id] === index;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={cn(
                                            "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                                            isSelected
                                                ? "border-primary bg-primary/5 shadow-sm"
                                                : "border-border hover:border-primary/50 hover:bg-muted/50"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "font-medium",
                                                isSelected ? "text-primary" : "text-foreground"
                                            )}
                                        >
                                            {option}
                                        </span>
                                        <div
                                            className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                                                isSelected
                                                    ? "border-primary bg-primary text-white"
                                                    : "border-muted-foreground/30 group-hover:border-primary/50"
                                            )}
                                        >
                                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                    </button>
                                );
                            })}

                        </div>

                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                        {isLastQuestion ? (
                            <>

                                <button
                                    onClick={() => setIsReviewMode(true)}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                                >
                                    <FiCheckCircle className="text-xl" />
                                    Review Answers
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                                >
                                    <FiCheckCircle className="text-xl" />
                                    Submit Exam
                                </button>
                            </>
                        ) : (
                            <button
                                className={cn(
                                    "flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg",
                                    isFlagged[currentQuestion._id]
                                        ? "bg-yellow-500 text-black hover:bg-yellow-600 shadow-yellow-500/20"
                                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20"
                                )}
                                onClick={handleFlagToggle}
                            >
                                {isFlagged[currentQuestion._id] ? "Unflag" : "Flag"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-6">
                        <h3 className="font-semibold text-foreground mb-4">
                            Question Navigator
                        </h3>
                        <div className="grid grid-cols-5 gap-3">
                            {questions.map((q, idx) => {
                                const isAnswered = answers[q._id] !== undefined;
                                const isCurrent = currentQuestionIndex === idx;
                                const isQuestionFlagged = isFlagged[q._id];
                                const isLocked = idx > 0 && answers[questions[idx - 1]._id] === undefined;

                                return (
                                    <button
                                        key={q._id}
                                        onClick={() => setCurrentQuestionIndex(idx)}
                                        disabled={isLocked}
                                        className={cn(
                                            "aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200",
                                            isCurrent
                                                ? "bg-primary text-white shadow-md ring-2 ring-primary ring-offset-2"
                                                : isQuestionFlagged
                                                    ? "bg-yellow-200 text-yellow-800 border-2 border-yellow-500"
                                                    : isAnswered
                                                        ? "bg-green-100 text-green-700 border border-green-200"
                                                        : isLocked
                                                            ? "bg-muted/20 text-muted-foreground/50 cursor-not-allowed"
                                                            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}

                        </div>

                        <div className="mt-6 space-y-3 pt-6 border-t border-border">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-4 h-4 rounded bg-primary" />
                                <span className="text-muted-foreground">Current</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-4 h-4 rounded bg-green-100 border border-green-200" />
                                <span className="text-muted-foreground">Answered</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-4 h-4 rounded bg-yellow-200 border border-yellow-400" />
                                <span className="text-muted-foreground">Flagged</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-4 h-4 rounded bg-muted/50" />
                                <span className="text-muted-foreground">Not Visited</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
