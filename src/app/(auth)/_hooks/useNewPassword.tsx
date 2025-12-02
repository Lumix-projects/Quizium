import toast from "react-hot-toast";
import { SetNewPassword } from "../_services/auth";
import { resetPasswordSchema, ResetPasswordSchema } from "@/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useWizard } from "react-use-wizard";

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
    // Check if email exists before setting new password
    if (!email) {
      toast.error("Something went wrong. Please re-enter your email.");
      goToStep(0);
      return;
    }

    // Call backend service to set new password
    const result = await SetNewPassword(email, values.newPassword);

    // Show error and abort if password reset failed
    if (result.error) {
      toast.error(result.error);
      reset();
      return;
    }

    // Show success toast
    toast.success(result.data.message);

    // Navigate user to login page
    router.push("/login");

    // Reset form
    reset();
  };

  return { register, handleSubmit, isSubmitting, errors, onSubmit };
}
