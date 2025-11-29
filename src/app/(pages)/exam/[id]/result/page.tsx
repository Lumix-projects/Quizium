
import { getResult } from "@/services/exam";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Link from "next/link";
import { Skeleton } from "@/components/shared/Skeleton";

export default async function ExamResultPage({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const result = await getResult(id as string); 

    if (!result) {
        return (
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4">
                    <Skeleton className="h-12 w-48 mx-auto" />
                    <Skeleton className="h-6 w-32 mx-auto" />
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <Skeleton className="h-24 rounded-xl" />
                        <Skeleton className="h-24 rounded-xl" />
                        <Skeleton className="h-24 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold text-foreground">Result not found</h1>
                <Link href="/" className="text-primary hover:underline mt-4 inline-block">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const isPassed = result.percentage >= 50;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
            {/* Score Card */}
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 ${isPassed ? "bg-green-500" : "bg-red-500"}`} />

                <div className="mb-6">
                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${isPassed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}>
                        {isPassed ? <FiCheckCircle /> : <FiXCircle />}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {isPassed ? "Congratulations!" : "Keep Practicing!"}
                    </h1>
                    <p className="text-muted-foreground">
                        You have {isPassed ? "passed" : "failed"} the exam
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Score</p>
                        <p className="text-2xl font-bold text-foreground">
                            {result.score} / {result.totalMarks}
                        </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Percentage</p>
                        <p className={`text-2xl font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
                            {result.percentage}%
                        </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <p className={`text-2xl font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
                            {isPassed ? "Passed" : "Failed"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
                <Link
                    href="/"
                    className="px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    Back to Dashboard
                </Link>
                <Link
                    href="/history"
                    className="px-8 py-3 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                    View History
                </Link>
            </div>
        </div>
    );
}
