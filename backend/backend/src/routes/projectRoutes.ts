import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  assignTask,
  getUserTasks
} from '../controllers/projectController';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/assign', assignTask);
router.get('/tasks/:userId', getUserTasks);

export default router;