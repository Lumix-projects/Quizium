import api from "@/lib/axios";
import { Subject } from "@/types";

export const getAllSubjects = async (): Promise<Subject[]> => {
    try {
        const response = await api.get<{ subjects: Subject[] }>("/subjects");
        return response.data.subjects;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};
