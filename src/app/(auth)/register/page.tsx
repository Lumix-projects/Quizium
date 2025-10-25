import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import Link from "next/link";

function RegisterPage() {
  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <h1 className="text-xl lg:text-2xl font-bold text-primary">
          Create your account
        </h1>
        <p className="text-xs lg:text-sm text-muted">
          Please sign up to get started and enjoy all our quizzes.
        </p>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <form className="flex flex-col gap-3 lg:gap-5">
          {/* First + Last Name */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-heading mb-1">
                First Name
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="First name"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-text-heading mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* user name */}
          <div>
            <label className="block text-sm font-medium text-text-heading mb-1">
              User name
            </label>
            <input
              type="text"
              className="input w-full"
              placeholder="Enter your user name"
            />
          </div>

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

          {/* Phone number */}
          <div>
            <label className="block text-sm font-medium text-text-heading mb-1">
              Phone Number
            </label>
            <input
              type="email"
              className="input w-full"
              placeholder="Enter your phone number"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-text-heading mb-1">
              Confirm password
            </label>
            <input
              type="password"
              className="input w-full"
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="main-btn w-full">
            Login
          </button>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        Already have an account ?{" "}
        <Link href="/login" className="text-primary underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}

export default RegisterPage;
