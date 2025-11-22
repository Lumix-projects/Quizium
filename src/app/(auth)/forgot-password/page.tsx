"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { forgotPassword } from "@/services/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  return <EnterYourEmail />;
}

function EnterYourEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async ({ email }: { email: string }) => {
    const result = await forgotPassword(email);
    console.log("Email:", email);
    console.log("result:", result);
  };

  return (
    <Card>
      {/* Header */}

      <CardHeader>
        <h1 className="text-2xl font-bold text-primary">
          Login into your account
        </h1>
        <p className="text-sm text-muted">
          Please log in or sign up to continue using our app.
        </p>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <label className="block text-sm font-medium text-text-heading mb-1">
            Enter Your Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="input w-full pr-10"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs px-3 py-2 border border-border rounded-lg mt-2">
              {errors.email?.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="main-btn w-full disabled:opacity-50 mt-3"
          >
            {isSubmitting ? "Sending..." : "Reset Password"}
          </button>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        Remember your password?{" "}
        <Link href="/login" className="text-primary underline">
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
