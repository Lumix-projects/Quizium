"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import InputField from "@/components/InputField";
import { useLogin } from "@/hooks/useLogin";
import Link from "next/link";

function LoginPage() {
  const { register, handleSubmit, login, errors, isSubmitting } = useLogin();

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <h1 className="text-2xl font-bold text-primary">Login into your account</h1>
        <p className="text-sm text-muted">
          Please log in or sign up to continue using our app.
        </p>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <form onSubmit={handleSubmit(login)} 
        className="flex flex-col gap-5">
          
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
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              Remember me
            </label>

            <Link href="/forgotPassword" className="text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="main-btn w-full disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
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
