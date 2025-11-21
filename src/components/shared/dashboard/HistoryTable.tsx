import React from 'react';
import { Score } from '@/types';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface HistoryTableProps {
    scores: Score[];
}

export default function HistoryTable({ scores }: HistoryTableProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Quiz</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Score</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score) => {
                        const isPassed = score.percentage >= 50;

                        return (
                            <tr key={score._id} className="border-b border-border hover:bg-card-hover transition-colors">
                                <td className="py-3.5 px-4">
                                    <span className="text-sm font-medium text-foreground">Quiz Attempt</span>
                                </td>
                                <td className="py-3.5 px-4">
                                    <span className="text-sm text-muted-foreground">{formatDate(score.createdAt)}</span>
                                </td>
                                <td className="py-3.5 px-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">{score.score}/{score.totalMarks}</span>
                                        <span className="text-xs text-muted-foreground">{score.percentage.toFixed(1)}%</span>
                                    </div>
                                </td>
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-1.5">
                                        {isPassed ? (
                                            <>
                                                <FiCheckCircle className="text-success text-base" />
                                                <span className="text-sm font-medium text-success">Passed</span>
                                            </>
                                        ) : (
                                            <>
                                                <FiXCircle className="text-error text-base" />
                                                <span className="text-sm font-medium text-error">Failed</span>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
