/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerSchema, RegisterSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerUser } from "@/services/auth";
import { setAuthCookie } from "@/lib/token";

export function useRegister() {
  // Hooks
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
    // Remove frontend-only fields before sending to backend
    const { rePassword, phone, ...payload } = values;

    // Call backend registration service
    const result = await registerUser(payload);

    // Show error and abort if registration failed
    if (result.error) {
      toast.error(result.error);
      return;
    }

    // Set auth cookie and handle errors
    if (!setAuthCookie(result.data.token)) {
      toast.error("Error during registration");
    }

    // Show success toast
    toast.success("Registration successful!");

    // Redirect based on user role (admin goes to admin dashboard, user goes to home)
    const redirectPath = result.data.user.isAdmin ? "/admin" : "/";
    router.push(redirectPath);

    // Reset form after registration
    reset();
  }

  return { register, handleSubmit, errors, SignUp, isSubmitting };
}
