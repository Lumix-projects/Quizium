/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import { cookies } from "next/headers";
import { User, Score } from "@/types";

export const getServerToken = async () => {
  return (await cookies()).get("token")?.value;
};

export const getUserProfileServer = async (): Promise<User> => {
  const token = await getServerToken();

  try {
    const response = await api.get<{ user: User }>("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    throw new Error(message);
  }
};

export const getUserScoresServer = async (): Promise<Score[]> => {
  const token = await getServerToken();
  try {
    const response = await api.get<{ scores: Score[] }>("/scores/my-scores", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.scores;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    throw new Error(message);
  }
};
