import Image from "next/image";
import Link from "next/link";

function LoginPage() {
  return (
    <>
      <div className="relative h-20 w-20">
        <Image src="/logotab.png" alt="login image" fill />
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-primary text-center sm:text-left">
        Login into your account
      </h1>

      <form className="flex flex-col gap-5 max-w-md w-full">
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
        <div className="flex items-center justify-between text-sm text-primary mt-2">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              className="w-4 h-4 accent-primary cursor-pointer"
              name="remember"
              id="remember"
            />
            Remember me
          </label>

          <Link href="/forgotPassword" className="hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="main-btn py-3 w-full">
          Login
        </button>
      </form>
    </>
  );
}

export default LoginPage;
