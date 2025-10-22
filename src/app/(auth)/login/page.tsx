import React from 'react'

function Page() {
    return (
        <section className="flex flex-col-reverse sm:flex-row justify-center items-center min-h-screen">
            {/* ===== Left Section (Form) ===== */}
            <div className="w-full sm:w-1/2 flex flex-col gap-6 items-center justify-center px-6 sm:px-8 py-10 sm:py-0">
                <h1 className="text-xl sm:text-2xl font-bold text-primary text-center sm:text-left">
                    Login into your account
                </h1>

                <form className="flex flex-col gap-5 w-full max-w-md">
                    {/* First + Last Name */}
                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className="flex-1">
                            <label
                                className="block text-sm font-medium text-text-heading mb-1"
                            >
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
                        <label
                            className="block text-sm font-medium text-text-heading mb-1"
                        >
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
                        <label
                            className="block text-sm font-medium text-text-heading mb-1"
                        >
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
                        <label
                            className="block text-sm font-medium text-text-heading mb-1"
                        >
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
            </div>

            {/* dark logo in mobile view */}
            <div className='block sm:hidden w-48'>
                <img src="/logoblack.png" alt="" />
            </div>

            {/* ===== Right Section (Image) ===== */}

            <div className="relative w-full sm:w-1/2 sm:h-screen hidden sm:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
                    <h2 className="text-4xl font-bold mb-3">Welcome to Quizium</h2>
                    <h4 className="text-lg font-medium opacity-90">
                        Dive into endless quizzes and discover your true potential.
                    </h4>
                </div>


                <img
                    src="/logowhite.png"
                    alt="Logo"
                    className="absolute right-6 top-6 w-40 z-10"
                />
                <img
                    src="/Ellipse 2.png"
                    alt="Background"
                    className="h-full w-full object-cover"
                />
            </div>

        </section>
    )
}

export default Page
