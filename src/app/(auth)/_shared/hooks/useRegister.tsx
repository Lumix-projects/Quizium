/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setAuthCookie } from "@/app/(auth)/_shared/lib/token";
import {
  registerSchema,
  RegisterSchema,
} from "@/app/(auth)/_shared/schemas/AuthSchema";
import { registerUser } from "@/app/(auth)/_shared/services/auth";
import { handleApiError } from "@/lib/handleApiError";

export function useRegister() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  async function SignUp(values: RegisterSchema) {
    const { rePassword, phone, ...payload } = values;

    try {
      const result = await registerUser(payload);

      // Set auth cookie
      setAuthCookie(result.token);

      // Redirect based on role
      const redirectPath = result.user.isAdmin ? "/admin" : "/";
      router.push(redirectPath);

      // Show success toast
      toast.success("Registration successful!");

      // Reset form
      reset();
    } catch (err) {
      handleApiError(err);
      reset();
    }
  }

  return { register, handleSubmit, errors, SignUp, isSubmitting };
}
