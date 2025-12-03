export interface ExamsResponse {
  exams: Exam[];
  totalCount: number;
  filters: Filters;
}

export interface Exam {
  _id: string;
  title: string;
  description: string;
  subject: ExamSubject;
  difficulty: DifficultyLevel;
  duration: number;
  totalMarks: number;
  createdBy: ExamCreator;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: ExamStatus;
  canTakeExam: boolean;
  isPassed: boolean;
  remainingAttempts: number;
}

export interface ExamSubject {
  _id: string;
  title: string;
  id: string;
}

export interface ExamCreator {
  _id: string;
  name: string;
  email: string;
}

export interface Filters {
  subject: string;
  difficulty: string;
  limit: number;
  sort: string;
}

export type DifficultyLevel = "beginner" | "intermediate" | "Advanced";
export type ExamStatus = "available" | "upcoming" | "archived";

export interface ExamFilters {
  limit?: number;
  difficulty?: string;
  sort?: string;
}
