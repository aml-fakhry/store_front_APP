import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../utils/http-response.util';

import { Logger } from './../utils/logger.util';

/**
 * A middleware that handles the errors that may occurs in express routes callbacks.
 * @param err The error object.
 * @param req The express request instance.
 * @param res The express response instance.
 * @param next The next middleware but actually this should be the last middleware in the pipeline, don't remove this parameter it's important.
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  Logger.error(err.message, err);

  InternalServerError(res, err);
}
