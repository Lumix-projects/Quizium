import { useEffect, useState } from "react";
import { getSubjectById, getAllTopics, getAllSubjects, getTopicById, getAllExams } from "@/services/content";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Exam, Subject, SubjectDetail, Topic } from "@/types";


export const useSubjects = () => {
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getAllSubjects();
                setSubjects(data);
            } catch (error) {
                const err = error as AxiosError<{ message: string }>;
                toast.error(err.response?.data.message || "Failed to load subjects");
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);
    return { subjects, loading };
}

export const useSubjectDetails = (id: string) => {
    const router = useRouter();
    const [subject, setSubject] = useState<SubjectDetail | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id || id === 'undefined') return;
            try {
                const [subjectData, topicsData] = await Promise.all([
                    getSubjectById(id as string),
                    getAllTopics(id as string)
                ]);
                setSubject(subjectData);
                setTopics(topicsData);
            } catch (error) {
                const err = error as AxiosError<{ message: string }>;
                toast.error(err.response?.data.message || "Failed to load data");
                router.push("/user/subjects");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, router]);
    return { subject, topics, loading };
}

export const useTopicDetails = (subjectId: string, topicId: string) => {
    const router = useRouter();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopic = async () => {
            if (!subjectId || subjectId === 'undefined' || !topicId || topicId === 'undefined') return;
            try {
                const data = await getTopicById(subjectId, topicId);
                // Handle potential array return from API 
                if (Array.isArray(data) && data.length > 0) {
                    setTopic(data[0]);
                } else if (!Array.isArray(data)) {
                    setTopic(data);
                } else {
                    throw new Error("Topic not found");
                }
            } catch (error) {
                const err = error as AxiosError<{ message: string }>;
                toast.error(err.response?.data.message || "Failed to load topic");
                router.push(`/user/subjects/${subjectId}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTopic();
    }, [subjectId, topicId, router]);

    return { topic, loading };
}

export const useExams = () => {
    const [loading, setLoading] = useState(true);
    const [exams, setExams] = useState<Exam[]>([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await getAllExams();
                setExams(data);
            } catch (error) {
                const err = error as AxiosError<{ message: string }>;
                toast.error(err.response?.data.message || "Failed to load exams");
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);
    return { exams, loading };
}