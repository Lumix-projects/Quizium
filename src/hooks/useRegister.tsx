import api from "@/lib/axios";
import { registerSchema, RegisterSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SignUpData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

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
      toast.success(`Welcome ${response.data.user.firstName}`);
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
