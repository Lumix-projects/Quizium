import React from 'react';
import { Score, Exam, Subject } from '@/types';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface HistoryTableProps {
    scores: Score[];
}

export default function HistoryTable({ scores }: HistoryTableProps) {
    if (!scores || scores.length === 0) {
        return (
            <div className="text-center py-10 text-slate-500">
                <p>No history found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-100 text-slate-500 text-sm">
                        <th className="py-4 px-4 font-medium">Exam</th>
                        <th className="py-4 px-4 font-medium">Date</th>
                        <th className="py-4 px-4 font-medium">Score</th>
                        <th className="py-4 px-4 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {scores.map((score) => {
                        const exam = score.exam as Exam;
                        const subject = typeof exam?.subject === 'object' ? (exam.subject as Subject) : null;
                        const isPassed = score.percentage >= 50;

                        return (
                            <tr key={score._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-4">
                                    <div>
                                        <p className="font-semibold text-slate-800">{exam?.title || 'Unknown Exam'}</p>
                                        {subject && <p className="text-xs text-slate-500">{subject.name}</p>}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-slate-500">
                                    {new Date(score.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-800">{score.score} / {score.totalMarks}</span>
                                        <span className="text-xs text-slate-500">{score.percentage}%</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isPassed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                        {isPassed ? <FiCheckCircle /> : <FiXCircle />}
                                        {isPassed ? 'Passed' : 'Failed'}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
