import React from 'react';
import { Exam, Subject } from '@/types';
import { FiClock, FiAward, FiBook } from 'react-icons/fi';

interface ExamCardProps {
    exam: Exam;
    onStart?: (examId: string) => void;
}

export default function ExamCard({ exam, onStart }: ExamCardProps) {
    const subjectName = typeof exam.subject === 'string' ? 'Unknown Subject' : (exam.subject as Subject).name;
    const subjectImage = typeof exam.subject === 'string' ? null : (exam.subject as Subject).image;

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/40 hover:shadow-sm group">
            <div className="h-32 bg-muted/20 relative overflow-hidden">
                {subjectImage ? (
                    <img src={subjectImage} alt={subjectName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/10 text-muted">
                        <FiBook className="text-3xl" />
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-medium text-foreground border border-border">
                    {subjectName}
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1" title={exam.title}>{exam.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2" title={exam.description}>{exam.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                        <FiClock className="text-primary" />
                        <span>{exam.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FiAward className="text-warning" />
                        <span>{exam.totalMarks} pts</span>
                    </div>
                </div>

                <button
                    onClick={() => onStart && onStart(exam._id)}
                    className="w-full py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-all duration-200 active:scale-95"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}
