import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import auth from './auth';
import project from './project';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/project', [checkJwt], project);

export default routes;
