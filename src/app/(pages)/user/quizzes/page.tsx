"use client";

import ExamCard from '@/components/shared/dashboard/ExamCard'
import React, { useEffect, useState } from 'react'
import { FiSearch, FiFilter } from 'react-icons/fi'
import { getAllExams, getAllSubjects } from '@/services/content'
import { Exam, Subject } from '@/types'
import toast from 'react-hot-toast'

export default function page() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [examsData, subjectsData] = await Promise.all([
                    getAllExams(),
                    getAllSubjects()
                ]);
                setExams(examsData);
                setSubjects(subjectsData);
            } catch (error) {
                console.error("Failed to fetch quizzes data", error);
                toast.error("Failed to load quizzes");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredExams = exams.filter(exam => {
        const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubject === 'all' ||
            (typeof exam.subject === 'object' ? (exam.subject as Subject)._id === selectedSubject : exam.subject === selectedSubject);
        return matchesSearch && matchesSubject;
    });

    const handleStartExam = (examId: string) => {
        // TODO: Navigate to exam taking page
        toast.success(`Starting exam: ${examId}`);
        // router.push(/user/exam/${examId});
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh] text-slate-500">Loading quizzes...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Available Quizzes</h1>
                    <p className="text-slate-500">Browse and take quizzes to test your knowledge</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:border-slate-300 focus:bg-white transition-all"
                        />
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full sm:w-48 pl-10 pr-8 py-2.5 rounded-xl bg-slate-100 text-slate-800 outline-none border border-transparent focus:border-slate-300 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="all">All Subjects</option>
                            {subjects.map(subject => (
                                <option key={subject._id} value={subject._id}>{subject.name}</option>
                            ))}
                        </select>
                        <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
            </div>

            {filteredExams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExams.map((exam) => (
                        <ExamCard key={exam._id} exam={exam} onStart={handleStartExam} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-500">No quizzes found matching your criteria.</p>
                    <button
                        onClick={() => { setSelectedSubject('all'); setSearchQuery(''); }}
                        className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    )
}
