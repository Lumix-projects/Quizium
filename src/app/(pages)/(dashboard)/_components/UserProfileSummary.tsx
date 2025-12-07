import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { UserData } from "@/types/user";
import Image from "next/image";

interface StatItemProps {
  value: number;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-xl font-bold text-foreground">{value}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);

export default function UserProfileSummary({ user }: { user: UserData }) {
  const stats = [
    { value: user.totalQuizzesTaken, label: "Quizzes" },
    { value: user.totalPointsGained, label: "Points" },
    { value: 5, label: "Badges" },
  ];

  return (
    <Card className="max-w-none w-full">
      <CardContent className="flex flex-col items-center flex-1 justify-center">
        {/* User Image */}
        <Image
          src={user.profileImage || "/avatar.png"}
          alt={`${user.name} profile image`}
          width={96}
          height={96}
          className="w-24 h-24 mb-4 rounded-full object-cover border-4 border-primary/10 shadow-lg"
        />

        {/* User Info */}
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {user.name}
        </h3>
        <p className="text-sm text-muted-foreground">@{user.username}</p>
      </CardContent>

      <CardFooter className="flex justify-around py-5">
        {/* User Stats */}
        {stats.map((stat) => (
          <StatItem key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </CardFooter>
    </Card>
  );
}
