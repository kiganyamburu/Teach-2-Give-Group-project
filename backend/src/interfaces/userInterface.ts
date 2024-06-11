export interface User {
  id?: number;
  username: string;
  password: string;
  passwordHash?: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}