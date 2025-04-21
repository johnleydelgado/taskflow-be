/* eslint-disable @typescript-eslint/no-unsafe-return */
import 'dotenv/config';
import server from '../src/server';
import { connectDB } from '../src/db';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let connected = false;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (!connected) {
    await connectDB();       // ensure DB is ready
    connected = true;
  }
  return server(req, res);
}