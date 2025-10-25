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

  const authPages: Record<
    string,
    { image: string; title: string; desc: string; order: string }
  > = {
    "/login": {
      image: "/auth/login.png",
      title: "Welcome Back",
      desc: "Sign in to continue your quest for knowledge.",
      order: "order-2",
    },
    "/register": {
      image: "/auth/register.png",
      title: "Join Quizium",
      desc: "Create your account and start your adventure today.",
      order: "order-1",
    },
  };

  const pageConfig = authPages[pathName] ?? authPages["/login"];

  return (
    <section className="grid min-h-screen xl:grid-cols-2">
      {/* Image Section */}
      <div
        className={cn(
          "hidden xl:flex relative h-full w-full items-center justify-center",
          pageConfig.order
        )}
      >
        <Image
          src={pageConfig.image}
          alt="Auth Image"
          fill
          className="-z-10 object-cover"
          priority
        />
        <ImageText title={pageConfig.title} desc={pageConfig.desc} />
      </div>

      {/* Content Section */}
      <main
        className={cn(
          "w-full flex items-center justify-center p-3",
          pageConfig.order === "order-1" ? "order-2" : "order-1"
        )}
      >
        {children}
      </main>
    </section>
  );
}

function ImageText({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-3 text-white text-center px-6">
      <h6 className="block text-5xl font-semibold">{title}</h6>
      <p className="text-lg">{desc}</p>
    </div>
  );
}
