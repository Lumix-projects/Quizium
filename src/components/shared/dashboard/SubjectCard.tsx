import React from 'react';
import { Subject } from '@/types';
import { FiBook, FiLayers } from 'react-icons/fi';
import Link from 'next/link';

interface SubjectCardProps {
    subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/40 hover:shadow-sm group">
            <div className="h-32 bg-muted/20 relative overflow-hidden">
                {subject.subjectImage ? (
                    <img src={subject.subjectImage} alt={subject.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/10 text-muted">
                        <FiBook className="text-3xl" />
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1" title={subject.name}>{subject.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2" title={subject.description}>{subject.description || "No description available."}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <FiLayers className="text-primary" />
                    <span>Browse Quizzes</span>
                </div>

                <Link
                    href={`/user/quizzes?subject=${subject._id}`}
                    className="w-full py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-all duration-200 active:scale-95 flex items-center justify-center"
                >
                    View Quizzes
                </Link>
            </div>
        </div>
    );
}
