import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useWizard } from "react-use-wizard";
import { forgotPassword } from "../services/auth";
import { handleApiError } from "@/lib/handleApiError";

export default function useForgotPasswordEmail({
  email,
  setEmail,
}: {
  email: string | null;
  setEmail: (email: string) => void;
}) {
  // Form Hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { emailValue: email ?? "" },
    mode: "onSubmit",
  });

  // Wizard Hook
  const { nextStep } = useWizard();

  // Handle email submission + send OTP
  const onSubmit = async ({ emailValue }: { emailValue: string }) => {
    try {
      // Call backend sendOTP service
      const result = await forgotPassword(emailValue);

      // Show success toast
      toast.success(result.message);

      // Save Email & Move to reset password step
      setEmail(emailValue);
      nextStep();

      // reset Form
      reset();
    } catch (err) {
      // Show error toast
      handleApiError(err);
      reset();
    }
  };

  return { register, handleSubmit, isSubmitting, onSubmit };
}
