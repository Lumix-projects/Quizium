"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const registerPage = pathName === "/register";

  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      {/* Image Section */}
      <div
        className={cn(
          "hidden lg:flex relative h-full w-full items-center justify-center ",
          registerPage ? "order-1" : "order-2"
        )}
      >
        <Image
          src={registerPage ? "/auth/register.jpg" : "/auth/login.png"}
          alt="Auth Image"
          fill
          className="-z-10"
        />
        {registerPage ? (
          // Register Text
          <ImageText
            title="Join Quizium"
            desc="Create your account and start your adventure today."
          />
        ) : (
          // Login Text
          <ImageText
            title="Welcome Back"
            desc="Sign in to continue your quest for knowledge."
          />
        )}
      </div>

      {/* Content Section */}
      <main
        className={cn(
          "flex flex-col gap-6 items-center justify-center px-6 sm:px-8 py-10 sm:py-0",
          registerPage ? "order-2" : "order-1"
        )}
      >
        {children}
      </main>
    </section>
  );
}

function ImageText({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-3 text-white text-center">
      <h6 className="block text-5xl font-semibold">{title}</h6>
      <p className="text-lg">{desc}</p>
    </div>
  );
}
