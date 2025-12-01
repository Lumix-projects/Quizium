import api from "@/lib/axios";
import { AxiosError } from "axios";
import cookies from "js-cookie";

export async function getExamQuestions(examId: string) {
  try {
    const response = await api.get(`questions/exam/${examId}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });

    return response.data.questions;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    throw new Error(message);
  }
}

export async function submitExam(
  examId: string,
  answers: { questionId: string; selectedAnswer: number }[]
) {
  try {
    const response = await api.post(
      `/scores/exam/${examId}/submit`,
      { answers },
      {
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }
    );

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || err.message || "Failed to submit exam";
    throw new Error(message);
  }
}
