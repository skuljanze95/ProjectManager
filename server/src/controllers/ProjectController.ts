import { Request, Response } from 'express';

class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    res.send({ authDone: true });
  };
}
export default ProjectController;
