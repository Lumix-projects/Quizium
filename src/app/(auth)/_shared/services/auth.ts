import {
  AuthResponse,
  LoginData,
  SignUpData,
} from "@/app/(auth)/_shared/types/auth";
import { apiClient } from "@/lib/apiClient";

// Register new user
export async function registerUser(
  values: Omit<SignUpData, "rePassword" | "phone">
) {
  return apiClient<AuthResponse>("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
}

// Login user
export async function loginUser(values: LoginData) {
  return apiClient<AuthResponse>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
}

// Send forgot password request
export async function forgotPassword(email: string) {
  return apiClient<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

// Verify OTP request
export async function verifyOTP(email: string, otp: string) {
  return apiClient<{ message: string }>("/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
}

// Set New Password
export async function setNewPassword(email: string, newPassword: string) {
  return apiClient<{ message: string }>("/auth/set-new-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });
}
