import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, {
    error: err.stack,
    request: {
      url: req.originalUrl,
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body,
    },
  });

  // If it's a custom ApiError, use its status code, otherwise default to 500
  const statusCode = (err as ApiError).statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Determine response based on environment
  const response = {
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};