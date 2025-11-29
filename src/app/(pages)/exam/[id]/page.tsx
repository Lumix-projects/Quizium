import { getExamQuestionsServer, getExamDetailsServer } from "@/services/server/examServer";
import ExamInterface from "@/components/shared/exam/ExamInterface";
import { FiAlertCircle } from "react-icons/fi";
import { Exam, Question } from "@/types";

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}


export default async function ExamPage({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    let examDetails: Exam | null = null;
    let questions: Question[] | null = null;
    let error = false;

    try {
        [examDetails, questions] = await Promise.all([
            getExamDetailsServer(id),
            getExamQuestionsServer(id)
        ]);
    } catch {
        error = true;
    }

    if (error || !examDetails || !questions) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <FiAlertCircle className="text-6xl text-error" />
                <h1 className="text-2xl font-bold text-foreground">
                    Error Loading Exam
                </h1>
                <p className="text-muted-foreground text-center max-w-md">
                    Something went wrong while loading the exam questions. Please try again later.
                </p>
            </div>
        );
    }

    const shuffledQuestions = shuffle(questions);

    if (shuffledQuestions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <FiAlertCircle className="text-6xl text-muted-foreground" />
                <h1 className="text-2xl font-bold text-foreground">
                    No Questions Found
                </h1>
                <p className="text-muted-foreground text-center max-w-md">
                    This exam currently has no questions. Please check back later!
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <ExamInterface
                questions={shuffledQuestions}
                examId={id}
                duration={examDetails.duration}
                examTitle={examDetails.title}
            />
        </div>
    );
}
