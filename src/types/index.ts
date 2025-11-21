export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    profileImage?: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Subject {
    _id: string;
    name: string;
    description?: string;
    subjectImage: string;
    pdfUrl: string[];
    createdBy: string | User;
    createdAt: string;
    updatedAt: string;
}

export interface Exam {
    _id: string;
    title: string;
    description: string;
    subject: Subject | string;
    duration: number; // in minutes
    totalMarks: number;
    createdBy: string | User;
    createdAt: string;
    updatedAt: string;
}

export interface Question {
    _id: string;
    exam: string;
    questionText: string;
    options: string[];
    correctAnswer?: number; // Hidden for non-admins usually
    marks: number;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface AnswerResult {
    question: string;
    selectedAnswer: number;
    isCorrect: boolean;
}

export interface Score {
    _id: string;
    user: string | User;
    exam: string | Exam;
    score: number;
    totalMarks: number;
    percentage: number;
    answers: AnswerResult[];
    createdAt: string;
}

export interface LeaderboardEntry {
    user: {
        _id: string;
        name: string;
        username: string;
        profileImage?: string;
    };
    totalScore: number;
    totalExams: number;
    averagePercentage: number;
}
