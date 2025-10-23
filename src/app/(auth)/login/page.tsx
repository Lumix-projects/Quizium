function Page() {
  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-primary text-center sm:text-left">
        Login into your account
      </h1>

      <form className="flex flex-col gap-5 max-w-md w-full">
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

        <button type="submit" className="main-btn py-3 w-full">
          Login
        </button>
      </form>
    </>
  );
}

export default Page;
