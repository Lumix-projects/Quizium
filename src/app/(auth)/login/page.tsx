import Link from "next/link";

function LoginPage() {
  return (
    <div className="w-full max-w-xl shadow-xl border border-border rounded-xl">
      {/* Login Header */}
      <header className="text-center space-y-1 p-6">
        <h1 className="text-2xl font-bold text-primary">
          Login into your account
        </h1>
        <p className="text-sm text-muted">
          Please log in or sign up to continue using our app.
        </p>
      </header>

      {/* Form */}
      <form className="flex flex-col gap-5 px-6 py-8 border-y border-border">
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

          <Link href="/forgotPassword" className="text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="main-btn w-full">
          Login
        </button>
      </form>

      {/* Login Footer */}
      <p className="text-center py-3 text-sm text-muted">
        Don&apos;t have an account ?{" "}
        <Link href="/register" className="text-primary underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
