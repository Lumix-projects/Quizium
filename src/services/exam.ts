/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import cookies from "js-cookie";

export async function getExamQuestions(examId: string) {
  try {
    const response = await api.get(`questions/exam/${examId}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });

    return response.data.questions;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    throw new Error(message);
  }
}

export async function submitExam(examId: string, answers: { question: string; answer: number }[]) {
  try {
    const response = await api.post(
      `/scores/exam/${examId}/submit`,
      { answers },
      {
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }
    );

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to submit exam";
    throw new Error(message);
  }
}

export async function getResult(examId: string) {
  try {
    const response = await api.get(`/scores/exam/${examId}/result`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });

    return response.data.result;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to get result";
    throw new Error(message);
  }
}
