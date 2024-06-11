import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';
import authMiddleware from './middlewares/authMiddleware';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();


app.use(cors());


app.use(express.json());


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


interface RequestWithUser extends Request {
  user: any;
}


const authMiddlewareWithUser = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as RequestWithUser, res, next);
};


app.use('/api/auth', authRoutes);


app.use('/api/users', authMiddlewareWithUser, userRoutes);
app.use('/api/projects', authMiddlewareWithUser, projectRoutes);


app.use(errorHandler);

export default app;