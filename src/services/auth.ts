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

// Send forgot password request
export async function forgotPassword(email: string) {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return { data: response.data, error: null };
  } catch (err) {
    const message = GetErrorMessage(err);
    return { data: null, error: message };
  }
}

// Verify OTP request
export async function verifyOTP(email: string, otp: string) {
  try {
    const response = await api.post("/auth/reset-password", { email, otp });
    return { data: response.data, error: null };
  } catch (err) {
    const message = GetErrorMessage(err);
    return { data: null, error: message };
  }
}

// Set New Password
export async function SetNewPassword(email: string, newPassword: string) {
  try {
    const response = await api.post("/auth/set-new-password", {
      email,
      newPassword,
    });
    return { data: response.data, error: null };
  } catch (err) {
    const message = GetErrorMessage(err);
    return { data: null, error: message };
  }
}
