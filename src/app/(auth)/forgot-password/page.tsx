"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { Divider } from "@/components/Divider";
import useVerifyOTP from "@/hooks/useVerifyOTP";
import { forgotPassword } from "@/services/auth";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { Wizard, useWizard } from "react-use-wizard";

// Parent: manages wizard steps + email state
export default function ForgotPassword() {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <Wizard>
      {/* Step 1: Email input */}
      <EnterYourEmail email={email} setEmail={setEmail} />

      {/* Step 2: OTP verification */}
      <OtpInput email={email} setEmail={setEmail} />
    </Wizard>
  );
}

// Email input function

function EnterYourEmail({
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

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold text-primary">Reset Your Password</h1>
        <p className="text-sm text-muted">
          Enter your email to receive a verification code.
        </p>
      </CardHeader>

      <CardContent>
        {/* Email form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <label className="block text-sm font-medium text-text-heading mb-1">
            Enter Your Email
          </label>

          {/* Email input with validation */}
          <input
            type="email"
            {...register("emailValue", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="input w-full pr-10"
            placeholder="Enter your email"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="main-btn w-full disabled:opacity-50 mt-3"
          >
            {isSubmitting ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      </CardContent>

      <CardFooter>
        Remember your password?{" "}
        <Link href="/login" className="text-primary underline">
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}

// Otp Input Function
function OtpInput({
  email,
  setEmail,
}: {
  email: string | null;
  setEmail: (email: string | null) => void;
}) {
  // Wizard Steps
  const { nextStep, previousStep } = useWizard();

  // OTP Input logic
  const {
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
  } = useVerifyOTP({ email, setEmail, nextStep, previousStep });

  return (
    <Card>
      <CardHeader className="py-5 space-y-3">
        <h1 className="text-2xl font-bold text-primary">Check Your Email</h1>
        <p className="text-sm text-muted">
          We&apos;ve sent a 6-digit code to{" "}
          <button
            className="font-bold text-primary underline cursor-pointer"
            onClick={handleChangeEmail}
          >
            {email}
          </button>
        </p>
      </CardHeader>

      <CardContent className="space-y-5 py-6 flex flex-col items-center">
        {/* 6-digit OTP input */}
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="tel"
          renderSeparator={<span className="w-3" />}
          renderInput={(props) => (
            <input
              {...props}
              className="
                w-12!
                text-center 
                aspect-square!
                border-2 border-primary/40 
                rounded-xl 
                focus:outline-none focus:border-primary
                text-xl font-bold
                transition-all duration-200
                bg-white
                shadow-sm
                hover:border-primary/60
              "
            />
          )}
          containerStyle="flex justify-center"
        />

        {/* Expiry label */}
        <p className="text-primary text-sm font-medium bg-muted/10 px-5 py-1 rounded-full inline-flex items-center gap-2">
          <Clock size={16} /> Code expires in {formatTime(expiry)}
        </p>
      </CardContent>

      <CardFooter className="text-center py-3 px-5">
        {/* Verify OTP */}
        <button
          onClick={handleVerifyOTP}
          disabled={isVerifying || otp.length !== 6}
          className="main-btn disabled:opacity-50"
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </button>

        <Divider>Didn&apos;t receive Code ?</Divider>

        {/* Resend OTP button */}
        <button
          onClick={handleResendOTP}
          disabled={countdown > 0 || isResending}
          className="bg-background text-foreground py-2 rounded-lg w-full cursor-pointer transition-all duration-300 hover:bg-primary/95 hover:text-background hover:-translate-y-0.5 disabled:opacity-50 border-2 border-primary"
        >
          {isResending
            ? "Resending..."
            : countdown > 0
            ? `Resend Code in ${formatTime(countdown)}`
            : "Resend Code"}
        </button>
      </CardFooter>
    </Card>
  );
}
