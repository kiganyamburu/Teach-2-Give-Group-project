import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import { pool, connectPool } from '../config/dbConfig';
import { User } from '../interfaces/userInterface';


export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log('Register Request Body:', req.body);
    const { username, password, email, role }: User = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    await connectPool();

 
    const checkUserRequest = pool.request();
    const checkUserResult = await checkUserRequest
      .input('Email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE Email = @Email');

    if (checkUserResult.recordset.length > 0) {
      return res.status(400).send({ message: 'A user with this email already exists' });
    }

    const request = pool.request();
    await request
      .input('Username', sql.NVarChar, username)
      .input('PasswordHash', sql.NVarChar, passwordHash)
      .input('Email', sql.NVarChar, email)
      .input('Role', sql.NVarChar, role)
      .query('INSERT INTO Users (Username, PasswordHash, Email, Role) VALUES (@Username, @PasswordHash, @Email, @Role)');

    return res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    return res.status(500).send({ message: (err as Error).message });
  }
};


export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log('Login Request Body:', req.body);
    const { email, password } = req.body;

    await connectPool();

    const request = pool.request();
    const result = await request
      .input('Email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE Email = @Email');

    if (result.recordset.length === 0) {
      console.log('No user found with the provided email');
      return res.status(400).send({ message: 'Invalid email or password.' });
    }

    const user: User = {
      ...result.recordset[0],
      passwordHash: result.recordset[0].PasswordHash,
    };

    console.log('User found:', user);

    if (!user.passwordHash) { 
      console.log('User does not have a password hash');
      return res.status(400).send({ message: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      console.log('Password does not match');
      return res.status(400).send({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return res.status(200).send({ token });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).send({ message: (err as Error).message });
  }
};