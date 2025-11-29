
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { Question, Exam } from "@/types";

export const getServerToken = async () => {
    return (await cookies()).get("token")?.value;
};

export async function getExamDetailsServer(examId: string) {
    const token = await getServerToken();

    try {
        const response = await api.get(`/exams/${examId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.exam as Exam;
    } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const message =
            err.response?.data?.message ||
            err.message ||
            "Something went wrong";
        throw new Error(message);
    }
}

export async function getExamQuestionsServer(examId: string) {
    const token = await getServerToken();

    try {
        const response = await api.get(`questions/exam/${examId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.questions as Question[];
    } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const message =
            err.response?.data?.message ||
            err.message ||
            "Something went wrong";
        throw new Error(message);
    }
}

export async function getResultServer(examId: string) {
    const token = await getServerToken();

    try {
        const response = await api.get(`/scores/exam/${examId}/result`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.result;
    } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const message =
            err.response?.data?.message ||
            err.message ||
            "Failed to get result";
        throw new Error(message);
    }
}
