"use client";
import { useEffect, useState } from "react";
import { getAllSubjects } from "@/services/content";
import { Subject } from "@/types";
import SubjectCard from "@/components/shared/dashboard/SubjectCard";
import DashboardCard from "@/components/shared/dashboard/DashboardCard";
import { FiLayers } from "react-icons/fi";
import toast from "react-hot-toast";

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getAllSubjects();
                setSubjects(data);
            } catch (error: any) {
                toast.error(error.message || "Failed to load subjects");
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-slate-800">Subjects</h1>
                <p className="text-slate-500">Explore all available subjects and their quizzes.</p>
            </div>

            {/* Subjects Grid */}
            <DashboardCard
                title="All Subjects"
                action={
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <FiLayers />
                        <span>{subjects.length} Subjects</span>
                    </div>
                }
            >
                {subjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {subjects.map((subject) => (
                            <SubjectCard key={subject._id} subject={subject} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500">
                        <FiLayers className="text-4xl mx-auto mb-4 opacity-20" />
                        <p>No subjects found.</p>
                    </div>
                )}
            </DashboardCard>
        </div>
    );
}
