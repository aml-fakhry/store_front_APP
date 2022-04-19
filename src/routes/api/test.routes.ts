import express, { NextFunction, Request, Response } from 'express';
import { TestDataAccess } from '../../data';
import { NotFound, OK } from '../../shared/utils/http-response.util';

/* test router to hold all modules route. */
export const testRouter = express.Router();

/**
 * the relative route for image.
 * No need to start with slash '/'.
 */
export const imageRelativeRouter = 'test';

testRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TestDataAccess.GetData();

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.validationErrors && result.validationErrors.length) {
      res.status(400).send(result.validationErrors[0].detail);
    } else if (result.data) {
      OK(res, result.data as never);
    }
  } catch (error) {
    next(error);
  }
});
