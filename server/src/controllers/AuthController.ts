import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../config/config';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => nanoid(16);

class AuthController {
  public static refTokens = new Array<{
    username: string;
    refreshToken: string;
  }>();
  private static issueToken = async (username: string) => {
    const userToken = {
      username,
    };

    const accessToken = jwt.sign(userToken, config.jwtSecret, {
      expiresIn: config.jwtSecretExpiration,
    });
    const refreshToken = jwt.sign(userToken, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshSecretExpiration,
    });

    AuthController.refTokens.push({
      username: username,
      refreshToken: refreshToken,
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  };

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

    let newToken = await AuthController.issueToken(username);

    res.send(newToken);
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

  //TODO: save refresh token to db, so you can revoke it.
  static refreshToken = async (req: Request, res: Response) => {
    const token = <string>req.headers['refresh-token'];
    let jwtPayload;

    try {
      jwtPayload = <any>jwt.verify(token, config.jwtRefreshSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      res.status(401).send();
      return;
    }

    const newToken = await AuthController.issueToken(jwtPayload.username);

    res.status(200).send(newToken);
  };
}
export default AuthController;
