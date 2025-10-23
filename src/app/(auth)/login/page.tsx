import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import Link from "next/link";

function LoginPage() {
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
        <form className="flex flex-col gap-5 ">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-heading mb-1">
              Email
            </label>
            <input
              type="email"
              className="input w-full"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text-heading mb-1">
              Password
            </label>
            <input
              type="password"
              className="input w-full"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-primary cursor-pointer"
                id="remember"
              />
              Remember me
            </label>

            <Link
              href="/forgotPassword"
              className="text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="main-btn w-full">
            Login
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
