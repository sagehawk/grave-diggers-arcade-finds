
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  avatarUrl?: string;
  bio?: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}
