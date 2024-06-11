import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';
import authMiddleware from './middlewares/authMiddleware';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Use cors middleware and allow all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log raw body
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Raw Body:', req.body);
  next();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    console.log('Invalid JSON:', req.body);
    return res.status(400).send({ message: 'Invalid JSON payload' });
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Project Management System API');
});

// Define a new type that includes the user property
interface RequestWithUser extends Request {
  user: any;
}

// Cast the Request to RequestWithUser in the middleware
const authMiddlewareWithUser = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as RequestWithUser, res, next);
};

// Authentication routes
app.use('/api/auth', authRoutes);

// Use the authentication middleware for protected routes
app.use('/api/users', authMiddlewareWithUser, userRoutes);
app.use('/api/projects', authMiddlewareWithUser, projectRoutes);

// Use the error handling middleware
app.use(errorHandler);

export default app;