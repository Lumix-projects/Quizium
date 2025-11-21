/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerSchema, RegisterSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerUser } from "@/services/auth";

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

    // Show success toast
    toast.success("Registration successful!");

    // Redirect to home page after successful registration
    router.push("/");

    // Reset form after registration
    reset();
  }

  return { register, handleSubmit, errors, SignUp, isSubmitting };
}
