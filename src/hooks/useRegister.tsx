import api from "@/lib/axios";
import { registerSchema, RegisterSchema } from "@/schemas/registerSchema";
import { SignUpData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerlogic } from "@/services/auth";
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
  try {
    const { rePassword, phone, ...rest } = values;

    const response = await registerlogic(rest);

    if (response && response.user) {
      router.push("/login");
      reset();
    } else {
      toast.error("Registration failed. Please try again.");
    }

  } catch (error: any) {
    toast.error(error.message || "Something went wrong");
    console.error(error);
  }
}



  return { register, handleSubmit, errors, SignUp, isSubmitting };
}
