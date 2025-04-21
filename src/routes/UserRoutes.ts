/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
// src/routes/UserRoutes.ts
import { Request, Response, NextFunction } from 'express';
import UserService from './services/UserService';
import { IUser } from 'src/models/User';
import HttpStatusCodes from 'src/constants/HttpStatusCodes';

/** Get all users */
export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.getAll();
    res.status(HttpStatusCodes.OK).json({ users });
  } catch (err) {
    next(err);
  }
}

/** Create new user */
export async function add(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, passwordHash,isManager }: IUser = req.body;
    const user = await UserService.addOne({ name, email, passwordHash,isManager });
    res.status(HttpStatusCodes.CREATED).json(user);
  } catch (err) {
    next(err);
  }
}

/** Update an existing user */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await UserService.updateOne(id, { name, email });
    res.status(HttpStatusCodes.OK).end();
  } catch (err) {
    next(err);
  }
}

/** Delete a user */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await UserService.delete(id);
    res.status(HttpStatusCodes.OK).end();
  } catch (err) {
    next(err);
  }
}

/** POST /api/users/login */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, passwordHash } = req.body as { email: string, passwordHash: string };
    const { token, user } = await UserService.login(email, passwordHash);

    // set as HTTP‑only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production', 
      maxAge:   1000 * 60 * 60 * 24, // 1 day
    });

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
}


export default { getAll, add, update, delete: deleteUser,login } as const;
