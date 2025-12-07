export interface SubjectsResponse {
    subjects: Subject[];
    totalCount: number;
}

export interface Subject {
    _id: string;
    id: string;
    title: string;
    description?: string;
    image: string;
    status: SubjectStatus;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export type SubjectStatus = "available" | "upcoming";

export interface SubjectFilters {
    limit?: number;
    status?: SubjectStatus;
}
