import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useWizard } from "react-use-wizard";
import { forgotPassword, verifyOTP } from "../_services/auth";

type UseVerifyOTPProps = {
  email: string | null;
  setEmail: (email: string | null) => void;
};

export default function useVerifyOTP({ email, setEmail }: UseVerifyOTPProps) {
  // ! Hooks
  const [otp, setOtp] = useState("");

  // Wizard Steps
  const { nextStep, previousStep } = useWizard();

  // Countdown for resend button (1 minute)
  const [countdown, setCountdown] = useState(60);

  // Countdown for OTP expiry (10 minutes)
  const [expiry, setExpiry] = useState(600);

  // Loading states
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Resend button countdown
  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  // OTP expiry countdown
  useEffect(() => {
    if (expiry > 0) {
      const t = setTimeout(() => setExpiry((prev) => prev - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [expiry]);

  // ! Verify Functions

  // Verify OTP code with backend
  const handleVerifyOTP = async () => {
    // Check on email Before Verify
    if (!email) {
      toast.error("Something went wrong. Please re-enter your email.");
      previousStep();
      return;
    }

    // Check on otp length Before Verify
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    // Trigger Verify loading state
    setIsVerifying(true);

    // Call backend VerifyingOTP service
    const result = await verifyOTP(email, otp);

    // Show error and abort if Verifying failed
    if (result.error) {
      toast.error(result.error);
      setOtp("");
      setIsVerifying(false);
      return;
    }

    // Show success toast
    toast.success(result.data.message);

    // Move to reset password step
    nextStep();

    // Reset OTP Input & stop verifying loading state
    setOtp("");
    setIsVerifying(false);
  };

  // Resend OTP when countdown finishes
  const handleResendOTP = async () => {
    if (!email || countdown > 0) return;

    // Trigger Resending loading state
    setIsResending(true);

    // Call backend sendOTP service
    const result = await forgotPassword(email);

    // Show error and abort if request failed
    if (result.error) {
      toast.error(result.error);

      // Reset OTP
      setOtp("");

      // Reset Timer
      setCountdown(0);

      // Stop resending loading state
      setIsResending(false);

      // Navigate back to enter his email
      previousStep();
      return;
    }

    // Show success toast
    toast.success("Code sent successfully");

    // Restart the two timers
    setCountdown(60);
    setExpiry(600);

    setIsResending(false);
  };

  const handleChangeEmail = () => {
    // Clear email
    setEmail(null);

    // Reset OTP input
    setOtp("");

    // Reset all timers
    setCountdown(0);
    setExpiry(0);

    // Go back to email step
    previousStep();

    // Show Toast
    toast.success("please enter your new email.");
  };

  // Format countdown timer (mm:ss)
  const formatTime = (seconds: number) =>
    new Date(seconds * 1000).toISOString().substr(14, 5);

  return {
    isVerifying,
    isResending,
    formatTime,
    handleResendOTP,
    handleVerifyOTP,
    otp,
    setOtp,
    expiry,
    countdown,
    handleChangeEmail,
  };
}
