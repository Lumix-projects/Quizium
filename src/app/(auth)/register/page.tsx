"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import InputField from "@/components/InputField";
import { useRegister } from "@/hooks/useRegister";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const { register, handleSubmit, SignUp, errors, isSubmitting } =
    useRegister();

  return (
    <Card>
      {/* Register Header */}
      <CardHeader>
        <h1 className="text-xl lg:text-2xl font-bold text-primary">
          Create your account
        </h1>
        <p className="text-xs lg:text-sm text-muted">
          Please sign up to get started and enjoy all our quizzes.
        </p>
      </CardHeader>

      {/* Register Form */}
      <CardContent>
        <form
          className="flex flex-col gap-3 lg:gap-5"
          onSubmit={handleSubmit(SignUp)}
        >
          {/* First + Last Name */}
          <div className="flex flex-col sm:flex-row gap-5">
            <InputField
              label="First Name"
              placeholder="First name"
              register={register}
              name="firstName"
              error={errors.firstName}
            />

            <InputField
              label="Last Name"
              placeholder="Last name"
              register={register}
              name="lastName"
              error={errors.lastName}
            />
          </div>

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

          <button
            type="submit"
            className="main-btn w-full flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader className="animate-spin" /> : "Sign Up"}
          </button>
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
