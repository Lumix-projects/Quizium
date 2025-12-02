export interface UserResponse {
  _id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rank: number;
  topPercentageMessage: string | null;
  totalQuizzesTaken: number;
  totalPointsGained: number;
}
