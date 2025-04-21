// api/index.ts
import 'dotenv/config'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import logger from 'jet-logger'
import app from 'src/server'
import { connectDB } from 'src/db'

let dbConnected = false

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!dbConnected) {
    await connectDB()
    dbConnected = true
    logger.info('✓ MongoDB connected')
  }
  // delegate _every_ request to your Express app
  return app(req as any, res as any)
}
