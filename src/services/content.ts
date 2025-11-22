import api from "@/lib/axios";
import { Subject, SubjectDetail, Topic } from "@/types";

export const getAllSubjects = async (): Promise<Subject[]> => {
    try {
        const response = await api.get<{ subjects: Subject[] }>("/subjects");
        return response.data.subjects;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const getSubjectById = async (subjectId: string): Promise<SubjectDetail> => {
    if (!subjectId || subjectId === 'undefined') {
        throw new Error("Invalid subject ID");
    }
    try {
        const response = await api.get<{ subject: SubjectDetail }>(`/subjects/${subjectId}`);
        return response.data.subject;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const getAllTopics = async (subjectId: string): Promise<Topic[]> => {
    if (!subjectId || subjectId === 'undefined') {
        throw new Error("Invalid subject ID");
    }
    try {
        const response = await api.get<{ topics: Topic[] }>(`/subjects/${subjectId}/topics`);
        return response.data.topics;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
}