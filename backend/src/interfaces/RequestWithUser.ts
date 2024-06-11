// src/interfaces/RequestWithUser.ts
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    role: string;
  };
}
