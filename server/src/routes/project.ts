import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';

const router = Router();

router.post('/createProject', ProjectController.createProject);

export default router;
