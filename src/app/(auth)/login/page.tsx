"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import InputField from "@/app/(auth)/_shared/components/InputField";
import { Button } from "@/components/ui/Button";
import { useLogin } from "@/app/(auth)/_shared/hooks/useLogin";
import Link from "next/link";
import AuthHeader from "../_shared/components/AuthHeader";
import RememberMe from "../_shared/components/RememberMe";
import { KeyRoundIcon, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

function LoginPage() {
  const {
    register,
    handleSubmit,
    login,
    errors,
    isSubmitting,
    handleQuickLogin,
    isQuickLoginLoading,
  } = useLogin();

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
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          {/* Quick Login Section */}
          <div
            onClick={
              isSubmitting || isQuickLoginLoading ? undefined : handleQuickLogin
            }
            className={cn(
              "rounded-lg border-2 border-dashed bg-primary/20 border-primary p-4",
              isSubmitting || isQuickLoginLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:scale-[0.98] transition-transform duration-300"
            )}
          >
            <div className="flex items-center gap-3">
              {/* Key Icon */}
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                {isQuickLoginLoading ? (
                  <Loader className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <KeyRoundIcon className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Quick Login Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h6 className="font-semibold">Quick Demo Access</h6>
                  <span className="px-2 py-0.5 bg-primary text-white text-xs font-medium rounded-full">
                    Demo
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {isQuickLoginLoading
                    ? "Signing you in..."
                    : "Try the app with demo credentials"}
                </p>
              </div>
            </div>
          </div>
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
