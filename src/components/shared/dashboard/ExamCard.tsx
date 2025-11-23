import { Exam, Subject, User } from '@/types';
import { FiClock, FiTrendingUp, FiPlay, FiUser, FiCalendar } from 'react-icons/fi';

interface ExamCardProps {
    exam: Exam;
    onStart?: (examId: string) => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function ExamCard({ exam, onStart }: ExamCardProps) {
    const subjectName = typeof exam.subject === 'string' ? 'Unknown Subject' : (exam.subject as Subject).name;
    const creatorName = typeof exam.createdBy === 'string' ? 'Unknown' : (exam.createdBy as User).name;

    return (
        <div className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1">
            {/* Header with Title */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-5 border-b border-border/50">
                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors" title={exam.title}>
                    {exam.title}
                </h3>
                <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <FiUser className="text-xs" />
                        <span>{creatorName}</span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-5">
                {/* Description */}
                <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed" title={exam.description}>
                    {exam.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <FiClock className="text-primary text-sm" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="text-sm font-semibold text-foreground">{exam.duration} min</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-warning/10">
                            <FiTrendingUp className="text-warning text-sm" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Points</p>
                            <p className="text-sm font-semibold text-foreground">{exam.totalMarks}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FiCalendar className="text-xs" />
                        <span>{formatDate(exam.createdAt)}</span>
                    </div>
                    <button
                        onClick={() => onStart && onStart(exam._id)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <FiPlay className="text-xs" />
                        <span>Start Quiz</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
