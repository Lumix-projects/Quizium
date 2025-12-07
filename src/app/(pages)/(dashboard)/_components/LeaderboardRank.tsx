import { Card, CardContent } from "@/components/ui/Card";
import { UserData } from "@/types/user";

export default function LeaderboardRank({ user }: { user: UserData }) {
  return (
    <Card className="max-w-none w-full">
      <CardContent className="text-center space-y-4">
        <h2 className="font-bold text-xl">🏆 Leaderboard Rank</h2>
        <span className="text-primary text-4xl font-extrabold block">
          #{user.rank}
        </span>
        {user.topPercentageMessage && (
          <p className="text-muted-foreground text-sm">
            {user.topPercentageMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
