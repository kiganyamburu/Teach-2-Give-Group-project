import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../interfaces/RequestWithUser';

const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = (req.headers as { [key: string]: string })['authorization'];
  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as RequestWithUser['user'];
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(400).send('Invalid token.');
  }
};

export const adminMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'superadmin') {
    return res.status(403).send('Access denied. Admins only.');
  }
  next();
};

export default authMiddleware;