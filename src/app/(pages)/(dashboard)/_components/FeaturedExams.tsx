import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import ExamCard from "./ExamCard";
import { Exam } from "../../exam/_shared/types/exam";

export default function FeaturedExams({ exams }: { exams: Exam[] }) {
  return (
    <Card className="max-w-none">
      <CardHeader className="text-start flex flex-col md:flex-row items-end md:items-start md:justify-between">
        <div className="max-w-xs">
          <h3 className="font-semibold">Featured Exams</h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Check out the top recommended exams curated just for you.
          </p>
        </div>
        <LinkButton variant="link" href="/quizzes">
          Explore more exams
        </LinkButton>
      </CardHeader>
      <CardContent className="space-y-8 md:space-y-6 lg:py-6">
        {exams.map((exam) => (
          <ExamCard exam={exam} key={exam._id} />
        ))}
      </CardContent>
    </Card>
  );
}
