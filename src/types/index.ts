export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  profileImage?: string;
  isAdmin: boolean;
}

export interface Subject {
  id: string;
  _id?: string;
  title: string;
  description?: string;
  image: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  status: "available" | "upcoming";
}

export interface SubjectDetail {
  id: string;
  title: string;
  description?: string;
  image?: string;
  status: "available" | "upcoming";
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  subject: string | Subject;
  createdAt: string;
  updatedAt: string;
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
  exam: Exam;
  score: number;
  totalMarks: number;
  percentage: number;
  answers: AnswerResult[];
  createdAt: string;
  attemptNumber: number;
}

export interface Exam {
  _id: string;
  title: string;
  description: string;
  subject: string | Subject;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  totalMarks: number;
  questions: string[] | Question[];
  createdBy: string | User;
  createdAt: string;
  updatedAt: string;
  canTakeExam?: boolean;
  remainingAttempts?: number;
}
