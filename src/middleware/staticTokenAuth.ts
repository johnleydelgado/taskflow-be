// src/middleware/staticTokenAuth.ts
import { RequestHandler } from 'express';
import ENV from '@src/constants/ENV';

export const staticTokenAuth: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing Authorization header' });
    return;              // ← early exit, no return value
  }
  const token = auth.slice(7).trim();
  if (token !== ENV.JwtSecret) {
    res.status(401).json({ message: 'Invalid API token' });
    return;
  }
  next();
};
