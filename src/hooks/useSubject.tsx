import { useEffect, useState } from "react";
import { getSubjectById, getAllTopics, getAllSubjects } from "@/services/content";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Subject, SubjectDetail, Topic } from "@/types";


export const useSubjects = () => {
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState<Subject[]>([]);

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