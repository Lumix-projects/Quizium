import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useWizard } from "react-use-wizard";
import { forgotPassword } from "../services/auth";

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
    // Call backend sendOTP service
    const result = await forgotPassword(emailValue);

    // Show error and abort if Verifying failed
    if (result.error) {
      toast.error(result.error);
      reset();
      return;
    }

    // Show success toast
    toast.success(result.data.message);

    // Save Email & Move to reset password step
    setEmail(emailValue);
    nextStep();

    // reset Form
    reset();
  };
  return { register, handleSubmit, isSubmitting, onSubmit };
}
