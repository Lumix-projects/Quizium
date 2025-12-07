import { getServerToken } from "@/lib/getServerToken";
import { ExamFilters, ExamsResponse } from "../types/exam";
import { apiClient } from "@/lib/apiClient";
import { cache } from "react";

const getAllExams = async (filters: ExamFilters = {}) => {
  // Get Server Token
  const token = await getServerToken();

  const params = new URLSearchParams();

  if (filters.limit !== undefined) params.set("limit", String(filters.limit));
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.sort) params.set("sort", filters.sort);

  const endpoint = `/exams?${params.toString()}`;

  const res = await apiClient<ExamsResponse>(endpoint, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "force-cache",
    next: {
      tags: ["all-exams"],
      revalidate: 3600,
    },
  });

  return res.exams;
};

export const getAllExamsCached = cache(getAllExams);
