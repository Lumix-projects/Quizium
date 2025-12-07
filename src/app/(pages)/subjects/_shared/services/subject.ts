import { getServerToken } from "@/lib/getServerToken";
import { SubjectFilters, SubjectsResponse } from "../types/subject";
import { apiClient } from "@/lib/apiClient";
import { cache } from "react";

// Get all subjects with optional filters
const getAllSubjects = async (filters: SubjectFilters = {}) => {
    // Get Server Token
    const token = await getServerToken();

    const params = new URLSearchParams();

    if (filters.limit !== undefined) params.set("limit", String(filters.limit));
    if (filters.status) params.set("status", filters.status);

    const endpoint = `/subjects?${params.toString()}`;

    const res = await apiClient<SubjectsResponse>(endpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "force-cache",
        next: {
            tags: ["all-subjects"],
            revalidate: 3600,
        },
    });

    return res.subjects;
};

// Export cached version for use in server components
export const getAllSubjectsCached = cache(getAllSubjects);
