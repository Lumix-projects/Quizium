"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import InputField from "@/app/(auth)/_shared/components/InputField";
import Button from "@/components/ui/Button";
import { useLogin } from "@/app/(auth)/_shared/hooks/useLogin";
import Link from "next/link";
import AuthHeader from "../_shared/components/AuthHeader";
import RememberMe from "../_shared/components/RememberMe";

function LoginPage() {
  const { register, handleSubmit, login, errors, isSubmitting } = useLogin();

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <AuthHeader
          title="Login into your account"
          desc="Please log in or sign up to continue using our app."
        />
      </CardHeader>

      {/* Form */}
      <CardContent>
        <form onSubmit={handleSubmit(login)} className="flex flex-col gap-5">
          {/* Email */}
          <InputField
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            register={register}
            error={errors.password}
            placeholder="Enter your password"
          />

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <RememberMe />

            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        Don&apos;t have an account ?{" "}
        <Link href="/register" className="text-primary underline">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
