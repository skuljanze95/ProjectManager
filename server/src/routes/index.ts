import { Router } from 'express';
import auth from './auth';
import project from './project';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/project', project);

export default routes;
