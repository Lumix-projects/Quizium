import { LoginData, SignUpData } from "@/types/auth";
import api from "@/lib/axios";
import { GetErrorMessage } from "@/lib/getErrorMessage";

// Register new user
export async function registerUser(
  values: Omit<SignUpData, "rePassword" | "phone">
) {
  try {
    const response = await api.post("/auth/register", values);
    return { data: response.data, error: null };
  } catch (err) {
    const message = GetErrorMessage(err);
    return { data: null, error: message };
  }
}

// Login user
export async function loginUser(values: LoginData) {
  try {
    const response = await api.post("/auth/login", values);
    return { data: response.data, error: null };
  } catch (err) {
    const message = GetErrorMessage(err);
    return { data: null, error: message };
  }
}
