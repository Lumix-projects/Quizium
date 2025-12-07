import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Subject } from "../../subjects/_shared/types/subject";
import SubjectCard from "../../subjects/_shared/components/SubjectCard";

interface FeaturedSubjectsProps {
    subjects: Subject[];
}

export default function FeaturedSubjects({ subjects }: FeaturedSubjectsProps) {
    // Filter only available subjects
    const availableSubjects = subjects.filter(
        (subject) => subject.status === "available"
    );

    return (
        <Card className="max-w-none">
            <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">
                    Featured Subjects
                </h2>
                <p className="text-sm text-muted-foreground">
                    Explore our available learning topics
                </p>
            </CardHeader>

            <CardContent>
                {/* Subjects Grid */}
                {availableSubjects.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-xl">
                        <div className="p-4 rounded-full bg-muted/20 mb-4">
                            <BookOpen className="w-10 h-10 text-muted" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">
                            No Subjects Available
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-[300px]">
                            Check back soon for new learning subjects
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {availableSubjects.map((subject) => (
                            <SubjectCard key={subject._id} subject={subject} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
