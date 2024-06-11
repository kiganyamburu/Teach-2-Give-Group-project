export interface User {
  id?: number;
  username: string;
  password: string; // Add this field
  passwordHash?: string; // Make this field optional
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}