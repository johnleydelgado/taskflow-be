/* eslint-disable n/no-extraneous-import */
/* eslint-disable @typescript-eslint/no-unsafe-return */
 
import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import server from '../server';
import { connectDB } from '../db';

let dbConnected = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!dbConnected) {
    await connectDB();       // init your Mongo once per cold start
    dbConnected = true;
  }
  return server(req, res);  // hand off to your Express app
}