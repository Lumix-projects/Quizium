import api from "@/lib/axios";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { Question, Exam } from "@/types";

export const getServerToken = async () => {
  return (await cookies()).get("token")?.value;
};

export async function getExamDetailsServer(examId: string) {
  const token = await getServerToken();

  try {
    const response = await api.get(`/exams/${examId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.exam as Exam;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    throw new Error(message);
  }
}

export async function getExamQuestionsServer(examId: string) {
  const token = await getServerToken();

  try {
    const response = await api.get(`questions/exam/${examId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.questions as Question[];
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    throw new Error(message);
  }
}

export const getAllExamsServer = async () => {
  const token = await getServerToken();

  try {
    const response = await api.get<{ exams: Exam[] }>("/exams", {
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

export async function getAnswersServer(examId: string) {
  const token = await getServerToken();

  try {
    const response = await api.get(`scores/answers/${examId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;

    // Check if this is the "not taken" error
    if (
      err.response?.data?.message ===
      "You have not taken this exam yet or no results found"
    ) {
      // Return this as a normal response, not an error
      return {
        message: "You have not taken this exam yet or no results found",
      };
    }

    // For all other errors, throw as usual
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    throw new Error(message);
  }
}
