import api from "@/lib/axios";
import { registerSchema, RegisterSchema } from "@/schemas/registerSchema";
import { SignUpData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    mode: "onSubmit",
  });

  async function SignUp(values: SignUpData) {
    try {
      // Calling API
      const response = await api.post("/auth/signup", values);
      console.log(response.data);

      // Success Message
      toast.success(`Welcome ${response.data.user.firstName}`);

      // Navigate User
      router.push("/login");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || error.message);
      } else {
        console.error(error);
      }
    }
  }

  return { register, handleSubmit, errors, SignUp, isSubmitting };
}
