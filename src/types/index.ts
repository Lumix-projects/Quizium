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
    id: string;
    _id?: string;
    name: string;
    description?: string;
    image: string;
    createdBy: string | User;
    createdAt: string;
    updatedAt: string;
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    image: string | null;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface SubjectDetail {
    id: string;
    title: string;
    description?: string;
    image: string | null;
    topics: Topic[];
}

export interface Question {
    _id: string;
    exam: string;
    questionText: string;
    options: string[];
    correctAnswer?: number;
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
    exam: string;
    score: number;
    totalMarks: number;
    percentage: number;
    answers: AnswerResult[];
    createdAt: string;
}

export interface Exam {
    _id: string;
    title: string;
    description: string;
    subject: string | Subject;
    duration: number;
    totalMarks: number;
    questions: string[] | Question[];
    createdBy: string | User;
    createdAt: string;
    updatedAt: string;
}
