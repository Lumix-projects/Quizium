import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import Button from "@/components/shared/Button";
import Link from "next/link";
import useForgotPasswordEmail from "../hooks/useForgotPasswordEmail";
import AuthHeader from "./AuthHeader";

export default function EnterYourEmail({
  email,
  setEmail,
}: {
  email: string | null;
  setEmail: (email: string) => void;
}) {
  // Component Custom Hooks
  const { register, handleSubmit, isSubmitting, onSubmit, errors } =
    useForgotPasswordEmail({ email, setEmail });

  return (
    <Card>
      {/* Email Header */}
      <CardHeader>
        <AuthHeader
          title="Reset Your Password"
          desc="Enter your email to receive a verification code."
        />
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

          {errors.emailValue && (
            <p className="text-red-500 text-xs px-3 py-2 border border-border rounded-lg mt-2">
              {errors.emailValue.message?.toString()}
            </p>
          )}

          {/* Submit button */}
          <Button type="submit" disabled={isSubmitting} className="mt-3">
            {isSubmitting ? "Sending..." : "Send Verification Code"}
          </Button>
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
