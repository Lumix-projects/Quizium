import React from 'react';
import { Subject } from '@/types';
import { FiBook, FiLayers } from 'react-icons/fi';
import Link from 'next/link';

interface SubjectCardProps {
    subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
            <div className="h-32 bg-slate-100 relative overflow-hidden">
                {subject.subjectImage ? (
                    <img src={subject.subjectImage} alt={subject.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                        <FiBook className="text-4xl" />
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1" title={subject.name}>{subject.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow" title={subject.description}>{subject.description || "No description available."}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    {/* Placeholder for potential stats like number of quizzes */}
                    <div className="flex items-center gap-1.5">
                        <FiLayers className="text-blue-500" />
                        <span>View Quizzes</span>
                    </div>
                </div>

                <Link
                    href={`/user/quizzes?subject=${subject._id}`}
                    className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
                >
                    View Exams
                </Link>
            </div>
        </div>
    );
}
