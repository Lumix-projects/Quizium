import { Card, CardContent } from "@/components/ui/Card";
import { UserData } from "@/types/user";

export default function LeaderboardRank({ user }: { user: UserData }) {
  return (
    <Card>
      <CardContent className="text-center space-y-4">
        <h2 className="font-bold text-xl">🏆 Leaderboard Rank</h2>
        <span className="text-primary text-4xl font-extrabold block">
          #{user.rank}
        </span>
        {/* {user.topPercentageMessage && ( */}
        <p className="text-muted-foreground text-sm">
          You are in the top 2% of 1,250 learners
        </p>
        {/* )} */}
      </CardContent>
    </Card>
  );
}
