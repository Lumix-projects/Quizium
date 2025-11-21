import React from 'react';
import { Exam, Subject } from '@/types';
import { FiClock, FiAward, FiBook } from 'react-icons/fi';

interface ExamCardProps {
    exam: Exam;
    onStart?: (examId: string) => void;
}

export default function ExamCard({ exam, onStart }: ExamCardProps) {
    const subjectName = typeof exam.subject === 'string' ? 'Unknown Subject' : (exam.subject as Subject).name;
    const subjectImage = typeof exam.subject === 'string' ? null : (exam.subject as Subject).subjectImage;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
            <div className="h-32 bg-slate-100 relative overflow-hidden">
                {subjectImage ? (
                    <img src={subjectImage} alt={subjectName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                        <FiBook className="text-4xl" />
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                    {subjectName}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1" title={exam.title}>{exam.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow" title={exam.description}>{exam.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5">
                        <FiClock className="text-blue-500" />
                        <span>{exam.duration} mins</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FiAward className="text-orange-500" />
                        <span>{exam.totalMarks} Marks</span>
                    </div>
                </div>

                <button
                    onClick={() => onStart && onStart(exam._id)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}
