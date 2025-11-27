"use client";

import { Question } from "@/types";
import { useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface ExamInterfaceProps {
    questions: Question[];
    examId: string;
}

export default function ExamInterface({ questions, examId }: ExamInterfaceProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion._id]: optionIndex,
        }));
        handleNext();
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleSubmit = () => {
        console.log("Submitting answers:", answers);
    };

    if (!currentQuestion) {
        return <div>No questions available.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
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
            <div className="flex justify-end">
                {isLastQuestion && (
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                    >
                        <FiCheckCircle className="text-xl" />
                        Submit Exam
                    </button>
                )}
            </div>
        </div>
    );
}
