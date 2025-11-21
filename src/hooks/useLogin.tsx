"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginUser } from "@/services/auth";
import { LoginData } from "@/types/auth";
import { loginSchema, LoginSchema } from "@/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { setAuthCookie } from "@/lib/token";

export function useLogin() {
  // Hooks
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  async function login(values: LoginData) {
    // Call backend registration service
    const result = await loginUser(values);

    // Show error and abort if registration failed
    if (result.error) {
      toast.error(result.error);
      return;
    }

    // Set auth cookie and handle errors
    if (!setAuthCookie(result.data.token)) {
      toast.error("Error during login");
    }

    // Show success toast
    toast.success("login successful!");

    // Redirect based on user role (admin goes to admin dashboard, user goes to home)
    const redirectPath = result.data.user.isAdmin ? "/admin" : "/";
    router.push(redirectPath);

    // Reset form after registration
    reset();
  }
  return { register, handleSubmit, errors, login, isSubmitting };
}
