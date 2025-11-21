import api from "@/lib/axios";
import { Subject, Exam, LeaderboardEntry } from "@/types";

export const getAllSubjects = async (): Promise<Subject[]> => {
    try {
        const response = await api.get<{ subjects: Subject[] }>("/subjects");
        return response.data.subjects;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const getAllExams = async (subjectId?: string): Promise<Exam[]> => {
    try {
        const params = subjectId ? { subject: subjectId } : {};
        const response = await api.get<{ exams: Exam[] }>("/exams", { params });
        return response.data.exams;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const getExam = async (id: string): Promise<Exam> => {
    try {
        const response = await api.get<{ exam: Exam }>(`/exams/${id}`);
        return response.data.exam;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const getLeaderboard = async (limit: number = 100): Promise<LeaderboardEntry[]> => {
    try {
        const response = await api.get<{ leaderboard: LeaderboardEntry[] }>("/leaderboard", {
            params: { limit },
        });
        return response.data.leaderboard;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};
