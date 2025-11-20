"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginUser } from "@/services/auth"; // ← غيّرها لاسم API اللوجين عندك
import { LoginData } from "@/types/auth";
import { loginSchema, LoginSchema } from "@/schemas/loginschema";
import { useRouter } from "next/navigation";

export function useLogin() {
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
      const response = await loginUser(values);

      if (response && response.user) {
        router.push("/");
        reset();
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    }
  }

  return { register, handleSubmit, errors, login, isSubmitting };
}
