import express, { NextFunction, Request, Response } from 'express';

import { categoryDataAccess } from '../../data/category';
import { Authenticate } from '../../shared';
import { NotFound, OK, BadRequest } from '../../shared/utils/http-response.util';

/* category router to hold all modules route. */
export const categoryRouter = express.Router();

/**
 * the relative route for category.
 * No need to start with slash '/'.
 */
export const categoryRelativeRouter = 'category';

/* Create a new category. */
categoryRouter.post('/', Authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryDataAccess.create(req.body);

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.data) {
      OK(res, { data: result.data });
    }
  } catch (error) {
    next(error);
  }
});

/* Get category route by id. */
categoryRouter.get('/:id', Authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryDataAccess.findById(parseInt(req.params.id));

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});

/* Get all categories route. */
categoryRouter.get('', Authenticate, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryDataAccess.getAllCategories();

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});
