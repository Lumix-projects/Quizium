export interface SignUpData {
  name: string;
  username: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Auth Response
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
