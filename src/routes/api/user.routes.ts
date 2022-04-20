import express, { NextFunction, Request, Response } from 'express';
import { NotFound, OK, unAuthenticated } from '../../shared/utils/http-response.util';
import { userDataAccess } from './../../data/user/user.data';
import { BadRequest } from './../../shared/utils/http-response.util';

/* user router to hold all modules route. */
export const userRouter = express.Router();

/**
 * the relative route for user.
 * No need to start with slash '/'.
 */
export const userRelativeRouter = 'user';

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userDataAccess.create(req.body);

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

/* Get user route. */
userRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await userDataAccess.findById(parseInt(req.params.id));
    if (Object.keys(result.error).length) {
      next(result.error);
    } else if (result.isNotFound) {
      return unAuthenticated(res);
    } else if (result.data) {
      OK(res, result);
    }
  } catch (error) {
    next(error);
  }
});
