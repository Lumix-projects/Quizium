import toast from "react-hot-toast";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/app/(auth)/_shared/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useWizard } from "react-use-wizard";
import { setNewPassword } from "../services/auth";
import { handleApiError } from "@/lib/handleApiError";

export default function useNewPassword({ email }: { email: string | null }) {
  // Hooks
  const router = useRouter();
  const { goToStep } = useWizard();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
    mode: "onSubmit",
  });

  // Handle password reset submission
  const onSubmit = async (values: ResetPasswordSchema) => {
    if (!email) {
      toast.error("Something went wrong. Please re-enter your email.");
      goToStep(0);
      return;
    }

    try {
      // Call backend service to set new password
      const result = await setNewPassword(email, values.newPassword);

      // Show success toast
      toast.success(result.message);

      // Navigate user to login page
      router.push("/login");

      // Reset form
      reset();
    } catch (err) {
      handleApiError(err);
      reset();
    }
  };

  return { register, handleSubmit, isSubmitting, errors, onSubmit };
}
