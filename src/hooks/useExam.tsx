"use client";
import { submitExam } from "@/services/exam";
import { Question } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ExamInterfaceProps {
    questions: Question[];
    examId: string;
    duration: number;
    examTitle?: string;
}

export function useExam({ questions, examId, duration }: ExamInterfaceProps) {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isFlagged, setFlagged] = useState<Record<string, boolean>>({});
    const [timeRemaining, setTimeRemaining] = useState(duration * 60);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    useEffect(() => {
        if (timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    const handleSubmit = async (autoSubmit = false) => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const formattedAnswers = Object.entries(answers).map(([questionId, answerIndex]) => ({
                question: questionId,
                answer: answerIndex,
            }));

            await submitExam(examId, formattedAnswers);
            toast.success(autoSubmit ? "Exam submitted!" : "Exam submitted successfully!");
            router.push(`/exam/${examId}/result`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to submit exam");
            setIsSubmitting(false);
        }
    };

    if (timeRemaining === 0 && !isSubmitting) {
        toast.error("Time's up! Exam is being submitted automatically.");
        handleSubmit(true);
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerColor = () => {
        if (timeRemaining < 60) return "text-red-600 dark:text-red-400";
        if (timeRemaining < 300) return "text-yellow-600 dark:text-yellow-400";
        return "text-foreground";
    };

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


    return {
        currentQuestion,
        currentQuestionIndex,
        answers,
        isReviewMode,
        isLastQuestion,
        isFlagged,
        timeRemaining,
        isSubmitting,
        formatTime,
        getTimerColor,
        handleOptionSelect,
        handleNext,
        handleFlagToggle,
        handleSubmit,
        setCurrentQuestionIndex,
        setIsReviewMode,
        setAnswers,
        setFlagged,
        setTimeRemaining,
        setIsSubmitting,
    };

}