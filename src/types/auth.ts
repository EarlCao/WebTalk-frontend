export type UserStatus = "online" | "offline" | "away" | "busy";

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  status?: UserStatus;
  lastSeen?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
