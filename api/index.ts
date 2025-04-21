import 'dotenv/config';
import server from '../src/server';
import { connectDB } from '../src/db';

// Ensure DB is connected once per cold start
let connected = false;
export default async function handler(req, res) {
  if (!connected) {
    await connectDB();
    connected = true;
  }
  return server(req, res);
}
