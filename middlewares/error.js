/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/**
 * Represents an error in this API.
 */
export class APIError extends Error {
  constructor(errorCode, message) {
    super();
    this.code = errorCode || 500;
    this.message = message;
  }
}

/**
 * Applies Basic authentication to a route.
 * @param {Error} err The error object.
 * @param {Request} request The Express request object.
 * @param {Response} response The Express response object.
 * @param {NextFunction} next The Express next function.
 */
export const errorResponse = (err, request, response, next) => {
  const defaultMsg = `Failed to process ${request.url}`;

  if (err instanceof APIError) {
    response.status(err.code).json({ error: err.message || defaultMsg });
    return;
  }
  response.status(500).json({
    error: err ? err.message || err.toString() : defaultMsg,
  });
};
