/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import { cookies } from "next/headers";
import { Question } from "@/types";

export const getServerToken = async () => {
    return (await cookies()).get("token")?.value;
};

export async function getExamQuestionsServer(examId: string) {
    const token = await getServerToken();

    try {
        const response = await api.get(`questions/exam/${examId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.questions as Question[];
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
        throw new Error(message);
    }
}
