import React, { useState } from 'react';
import { Subject } from '@/types';
import { FiBook, FiLayers } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

interface SubjectCardProps {
    subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
    const [imageError, setImageError] = useState(false);

    const subjectId = subject.id || subject._id;

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/40 hover:shadow-sm group">
            <Link href={subjectId ? `/user/subjects/${subjectId}` : '#'} className="block h-32 bg-muted/20 relative overflow-hidden cursor-pointer">
                {subject.image && !imageError ? (
                    <Image
                        src={subject.image}
                        alt={subject.name || "Subject Image"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImageError(true)}
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/10 text-muted">
                        <FiBook className="text-3xl" />
                    </div>
                )}
            </Link>

            <div className="p-5">
                <Link href={subjectId ? `/user/subjects/${subjectId}` : '#'} className="block">
                    <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1 hover:text-primary transition-colors" title={subject.name}>{subject.name}</h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2" title={subject.description}>{subject.description || "No description available."}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <FiLayers className="text-primary" />
                    <span>Browse Quizzes</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Link
                        href={subjectId ? `/user/subjects/${subjectId}` : '#'}
                        className="py-2.5 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-muted transition-all duration-200 active:scale-95 flex items-center justify-center text-sm"
                    >
                        Details
                    </Link>
                    <Link
                        href={`/user/quizzes?subject=${subjectId}`}
                        className="py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-all duration-200 active:scale-95 flex items-center justify-center text-sm"
                    >
                        Quizzes
                    </Link>
                </div>
            </div>
        </div>
    );
}
