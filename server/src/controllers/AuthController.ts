import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../config/config';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => nanoid(16);

class AuthController {
  static login = async (req: Request, res: Response) => {
    let { username, password } = req.body;

    if (!(username && password))
      return res.status(400).send('Missing username or password.');

    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) return res.status(400).json('Username or password incorect');

    if (!bcrypt.compareSync(password, user.password))
      return res.status(400).json('Username or password incorect');

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.send({ accessToken: token });
  };

  static register = async (req: Request, res: Response) => {
    let { username, password } = req.body;

    if (!(username && password))
      return res.status(400).send('Missing username or password.');

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
          return res
            .status(400)
            .json('A new user cannot be created with this username');
        }
      }

      return res.status(400).json(e);
    }
    res.status(200).json('User created!');
  };
}
export default AuthController;
