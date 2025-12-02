"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginData } from "@/app/(auth)/_shared/types/auth";
import { useRouter } from "next/navigation";
import { setAuthCookie } from "@/app/(auth)/_shared/lib/token";
import { loginSchema, LoginSchema } from "@/schemas/AuthSchema";
import { loginUser } from "@/app/(auth)/_shared/services/auth";
import { handleApiError } from "@/lib/handleApiError";

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
    try {
      // Call backend registration service
      const result = await loginUser(values);

      // Show error and abort if registration failed
      setAuthCookie(result.token);

      // Redirect based on user role (admin goes to admin dashboard, user goes to home)
      const redirectPath = result.user.isAdmin ? "/admin" : "/";
      router.push(redirectPath);

      // Show success toast
      toast.success("login successful!");

      // Reset form after registration
      reset();
    } catch (err) {
      handleApiError(err);
      reset();
    }
  }
  return { register, handleSubmit, errors, login, isSubmitting };
}
