import { Request, Response, NextFunction } from 'express';

/**
 * Safely extracts a message from any thrown value.
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}

/**
 * Express error-handling middleware.
 * Sends a JSON response with a sanitized error message.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const message = getErrorMessage(err);
  // Log full error server-side for debugging
  console.error('ErrorHandler caught:', err);

  res.status(500).json({ error: message });
}
