import api from "@/lib/axios";
import { AxiosError } from "axios";
import { Score, Exam } from "@/types";
import { getServerToken } from "@/lib/getServerToken";
import { apiClient } from "@/lib/apiClient";
import { UserResponse } from "@/types/user";
import { cache } from "react";

// Get User data - wrapped with React cache for request memoization
const getUserProfile = async () => {
  // Server Token
  const token = await getServerToken();

  return apiClient<UserResponse>("/user/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "force-cache",
    next: {
      tags: ["user-profile"],
      revalidate: 3600,
    },
  });
};

// Export the cached version
export const getUserProfileCached = cache(getUserProfile);

export const getUserScoresServer = async (): Promise<Score[]> => {
  const token = await getServerToken();
  try {
    const response = await api.get<{ scores: Score[] }>("/scores/my-scores", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.scores;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    throw new Error(message);
  }
};
export const getExamBySubject = async (subjectId: string): Promise<Exam[]> => {
  const token = await getServerToken();

  try {
    const response = await api.get<{ exams: Exam[] }>("/exams", {
      params: { subject: subjectId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.exams;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    throw new Error(message);
  }
};
