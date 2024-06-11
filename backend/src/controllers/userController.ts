import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import sql from 'mssql';
import { pool } from '../config/dbConfig';
import { User } from '../interfaces/userInterface';


export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.request().query('SELECT * FROM Users');
    res.status(200).json(result.recordset);
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.request().input('Id', sql.Int, id).query('SELECT * FROM Users WHERE Id = @Id');
    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email, role }: User = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    await pool.request()
      .input('Username', sql.NVarChar, username)
      .input('PasswordHash', sql.NVarChar, passwordHash)
      .input('Email', sql.NVarChar, email)
      .input('Role', sql.NVarChar, role)
      .query('INSERT INTO Users (Username, PasswordHash, Email, Role) VALUES (@Username, @PasswordHash, @Email, @Role)');

    res.status(201).send('User created successfully');
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, password, email, role }: User = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.request()
      .input('Id', sql.Int, id)
      .input('Username', sql.NVarChar, username)
      .input('PasswordHash', sql.NVarChar, passwordHash)
      .input('Email', sql.NVarChar, email)
      .input('Role', sql.NVarChar, role)
      .query('UPDATE Users SET Username = @Username, PasswordHash = @PasswordHash, Email = @Email, Role = @Role WHERE Id = @Id');

    if (result.rowsAffected[0] > 0) {
      res.status(200).send('User updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.request().input('Id', sql.Int, id).query('DELETE FROM Users WHERE Id = @Id');
    if (result.rowsAffected[0] > 0) {
      res.status(200).send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};