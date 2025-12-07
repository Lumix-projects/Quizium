import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { formatShortDate } from "@/lib/date";
import { Score } from "@/types";
import { Trophy, Calendar, TrendingUp } from "lucide-react";

interface ActivityItemProps {
    score: Score;
}

// Activity Item Component - Displays individual quiz attempt
const ActivityItem = ({ score }: ActivityItemProps) => {
    // Determine score status and styling
    const getScoreStatus = (percentage: number) => {
        if (percentage >= 70) return { color: "text-success", label: "Excellent" };
        if (percentage >= 50) return { color: "text-warning", label: "Good" };
        return { color: "text-error", label: "Needs Improvement" };
    };

    const status = getScoreStatus(score.percentage);

    return (
        <article className="group relative p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300">
            {/* Content Container */}
            <div className="flex items-center justify-between gap-4">
                {/* Exam Info */}
                <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {score.exam.title}
                    </h3>

                    {/* Date & Attempt Info */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={score.createdAt}>
                                {formatShortDate(score.createdAt)}
                            </time>
                        </div>
                        <span className="text-border">•</span>
                        <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Attempt #{score.attemptNumber}</span>
                        </div>
                    </div>
                </div>

                {/* Score Badge */}
                <div className="flex flex-col items-end gap-1">
                    <span className={`text-2xl font-bold ${status.color}`}>
                        {Math.round(score.percentage)}%
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                        {score.score}/{score.totalMarks} pts
                    </span>
                </div>
            </div>
        </article>
    );
};

export default function RecentActivity({ scores }: { scores: Score[] }) {
    // Limit to most recent 5 attempts
    const recentScores = scores.slice(0, 5);

    return (
        <Card className="max-w-none">
            {/* Header */}
            <CardHeader>
                <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Your latest quiz attempts
                </p>
            </CardHeader>

            {/* Content */}
            <CardContent className="flex-1">
                {recentScores.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                        <div className="p-4 rounded-full bg-muted/20 mb-4">
                            <Trophy className="w-10 h-10 text-muted" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">
                            No Activity Yet
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-[200px]">
                            Start taking quizzes to see your recent activity here
                        </p>
                    </div>
                ) : (
                    // Activity List
                    <section className="space-y-3" aria-label="Recent quiz attempts">
                        {recentScores.map((score) => (
                            <ActivityItem key={score._id} score={score} />
                        ))}
                    </section>
                )}
            </CardContent>
        </Card>
    );
}
