import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcryptjs';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => nanoid(16);

class AuthController {
  static register = async (req: Request, res: Response) => {
    let { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send('Missing username or password.');
      console.log(await db.user.findMany());
      return;
    }

    try {
      await db.user.create({
        data: {
          id: genId(),
          username,
          password: bcrypt.hashSync(password, 8),
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          res
            .status(400)
            .json('A new user cannot be created with this username');
          return;
        }
      }
      res.status(400).json(e);
      return;
    }
    res.status(200).json('User created!');
  };
}
export default AuthController;
