import { UserData } from "@/types/user";

export default function Header({ user }: { user: UserData }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">
        Welcome Back, {user.name || "user"}
      </h1>
      <p className="text-muted-foreground">
        Let&apos;s Continue your learning journey
      </p>
    </div>
  );
}
