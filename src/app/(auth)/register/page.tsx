"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import InputField from "@/app/(auth)/_shared/components/InputField";
import Button from "@/components/shared/Button";
import { useRegister } from "@/app/(auth)/_shared/hooks/useRegister";
import Link from "next/link";
import AuthHeader from "../_shared/components/AuthHeader";

export default function RegisterPage() {
  const { register, handleSubmit, SignUp, errors, isSubmitting } =
    useRegister();

  return (
    <Card>
      {/* Register Header */}
      <CardHeader>
        <AuthHeader
          title="Create your account"
          desc="Please sign up to get started and enjoy all our quizzes."
        />
      </CardHeader>

      {/* Register Form */}
      <CardContent>
        <form
          className="flex flex-col gap-3 lg:gap-5"
          onSubmit={handleSubmit(SignUp)}
        >
          {/* First + Last Name */}
          <InputField
            label="Your name"
            placeholder="Enter your full name"
            register={register}
            name="name"
            error={errors.name}
          />

          {/* Username */}
          <InputField
            label="Username"
            placeholder="Enter your username"
            register={register}
            name="username"
            error={errors.username}
          />

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            name="email"
            error={errors.email}
          />

          {/* Phone */}
          <InputField
            label="Phone Number"
            placeholder="Enter your phone number"
            register={register}
            name="phone"
            error={errors.phone}
          />

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            name="password"
            error={errors.password}
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            register={register}
            name="rePassword"
            error={errors.rePassword}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>

      {/* Register Footer */}
      <CardFooter>
        Already have an account?{" "}
        <Link href="/login" className="text-primary underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
