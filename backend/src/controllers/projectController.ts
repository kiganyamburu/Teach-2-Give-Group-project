import { Request, Response } from 'express';
import sql from 'mssql';
import { pool } from '../config/dbConfig';
import { Project } from '../interfaces/projectInterface';
import { RequestWithUser } from '../interfaces/RequestWithUser';


export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.request().query('SELECT * FROM Projects');
    res.status(200).json(result.recordset);
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.request().input('Id', sql.Int, id).query('SELECT * FROM Projects WHERE Id = @Id');
    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).send('Project not found');
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status, assignedTo }: Project = req.body;
    const result = await pool.request()
      .input('Name', sql.NVarChar, name)
      .input('Description', sql.NVarChar, description)
      .input('Status', sql.NVarChar, status)
      .input('AssignedTo', sql.Int, assignedTo)
      .query('INSERT INTO Projects (Name, Description, Status, AssignedTo) VALUES (@Name, @Description, @Status, @AssignedTo)');
    res.status(201).send('Project created successfully');
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, status, assignedTo }: Project = req.body;
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .input('Name', sql.NVarChar, name)
      .input('Description', sql.NVarChar, description)
      .input('Status', sql.NVarChar, status)
      .input('AssignedTo', sql.Int, assignedTo)
      .query('UPDATE Projects SET Name = @Name, Description = @Description, Status = @Status, AssignedTo = @AssignedTo WHERE Id = @Id');
    if (result.rowsAffected[0] > 0) {
      res.status(200).send('Project updated successfully');
    } else {
      res.status(404).send('Project not found');
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.request().input('Id', sql.Int, id).query('DELETE FROM Projects WHERE Id = @Id');
    if (result.rowsAffected[0] > 0) {
      res.status(200).send('Project deleted successfully');
    } else {
      res.status(404).send('Project not found');
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const assignTask = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'superadmin') {
      res.status(403).send('Access denied. Admins only.');
      return;
    }

    const { projectId, userId } = req.body;
    const result = await pool.request()
      .input('ProjectId', sql.Int, projectId)
      .input('UserId', sql.Int, userId)
      .query('UPDATE Projects SET AssignedTo = @UserId WHERE Id = @ProjectId');
    if (result.rowsAffected[0] > 0) {
      res.status(200).send('Task assigned successfully');
    } else {
      res.status(404).send('Project or user not found');
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};


export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const result = await pool.request().input('UserId', sql.Int, userId).query('SELECT * FROM Projects WHERE AssignedTo = @UserId');
    res.status(200).json(result.recordset);
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};
