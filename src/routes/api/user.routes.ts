import express, { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { AppError, AppErrorCode, JWT } from '../../shared';
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

/* Login user by username and password route. */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userResult = await userDataAccess.findByCredentials(req.body.username, req.body.password);

    if (userResult.isNotFound) {
      return BadRequest(res, {
        code: AppErrorCode.Forbidden,
        title: AppError.Forbidden,
        source: 'username',
        detail: 'Invalid login',
      });
    }

    /*Create jwt for this user.*/
    const jwt = await JWT.genToken(uuid(), userResult.data?.id ?? 0);

    const jwtData = await JWT.verifyAndDecode(jwt, true);

    const accessTokenResult = await userDataAccess.createAccessToken({
      id: jwtData?.id ?? '',
      userId: userResult.data?.id ?? 0,
      issuedAt: new Date((jwtData?.iat ?? 0) * 1000),
      expiresAt: new Date((jwtData?.exp ?? 0) * 1000),
    });

    console.log({ accessTokenResult });

    if (accessTokenResult.validationErrors && accessTokenResult.validationErrors.length) {
      BadRequest(res, { errors: accessTokenResult.validationErrors });
    } else if (accessTokenResult.data) {
      OK(res, {
        data: {
          user: userResult.data,
          jwt: {
            token: jwt,
            issuedAt: accessTokenResult.data.issuedAt,
            expiresAt: accessTokenResult.data.expiresAt,
          },
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

/* Get user route. */
userRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await userDataAccess.findById(parseInt(req.params.id));
    console.log({ result });

    if (result.error) {
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
