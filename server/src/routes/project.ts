import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

router.post('/createProject', [checkJwt], ProjectController.createProject);

export default router;
