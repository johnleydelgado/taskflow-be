/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
import 'dotenv/config';
import server from '../src/server';
import { connectDB } from '../src/db';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import { IncomingMessage, ServerResponse } from 'http';

// Ensure DB is connected once per cold start
let connected = false;
export default async function handler(req: Request | IncomingMessage, res: Response | ServerResponse) {
  if (!connected) {
    await connectDB();
    connected = true;
  }
  return server(req, res);
}
