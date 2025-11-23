import api from "@/lib/axios";
import { Exam, Subject, SubjectDetail, Topic } from "@/types";


// subjects fetch
export const getAllSubjects = async (): Promise<Subject[]> => {
    try {
        const response = await api.get<{ subjects: Subject[] }>("/subjects");
        return response.data.subjects;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

// single subject fetch
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

// topics fetch
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

// single topic fetch
export const getTopicById = async (subjectId: string, topicId: string): Promise<Topic[]> => {
    if (!subjectId || subjectId === 'undefined' || !topicId || topicId === 'undefined') {
        throw new Error("Invalid topic ID");
    }
    try {
        const response = await api.get<{ topic: Topic[] }>(`/subjects/${subjectId}/topics/${topicId}`);
        return response.data.topic;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
}

// exams fetch
export const getAllExams = async (): Promise<Exam[]> => {
    try {
        const response = await api.get<{ exams: Exam[] }>("/exams");
        return response.data.exams;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
}

// single exam fetch
export const getExamById = async (examId: string): Promise<Exam> => {
    if (!examId || examId === 'undefined') {
        throw new Error("Invalid exam ID");
    }
    try {
        const response = await api.get<{ exam: Exam }>(`/exams/${examId}`);
        return response.data.exam;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
}