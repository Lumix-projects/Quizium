/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoginData, SignUpData } from "@/types/auth";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import cookies from "js-cookie";
export async function registerUser(
  values: Omit<SignUpData, "rePassword" | "phone">
) {
  try {
    const response = await api.post("/auth/register", values);
    toast.success("Registration successful!");

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    throw new Error(message);
  }
}

export async function loginUser(values: LoginData) {
  try {
    const response = await api.post("/auth/login", values);

    if (response.data?.token) {
      cookies.set("token", response.data.token, { expires: 7 });
      toast.success(`Welcome ${response.data.user?.name || "User"}`);
    }

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    throw new Error(message);
  }
}
