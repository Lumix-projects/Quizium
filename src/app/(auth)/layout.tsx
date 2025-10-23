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
          "hidden lg:block relative h-full w-full",
          registerPage ? "order-1" : "order-2"
        )}
      >
        <Image
          src={registerPage ? "/auth/register.png" : "/auth/login.png"}
          alt="Auth Image"
          fill
        />
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
