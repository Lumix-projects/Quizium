// Exam Submit

export interface ExamSubmitResponse {
  message: string;
  result: ExamResult;
  comparison?: ExamComparison;
}

export interface ExamResult {
  score: number;
  totalMarks: number;
  percentage: number;
  attemptNumber: number;
  isRetake: boolean;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface ExamComparison {
  previousAttempt?: PreviousAttempt;
  improvement?: Improvement;
}

export interface PreviousAttempt {
  score: number;
  percentage: number;
  completedAt: string;
}

export interface Improvement {
  score: number;
  percentage: number;
  status: string;
}
