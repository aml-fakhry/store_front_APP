import { Request, Response, NextFunction } from 'express';
import { InternalServerError, JWT, unAuthenticated } from '../utils';

/**
 * Authenticates the coming request by validating the jwt against validity and expiration.
 * @param req The express request.
 * @param res The express response.
 * @param next The next function in the pipeline.
 */
export async function Authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const jwtData = await JWT.verifyAndDecode(req.headers.authorization ?? '');

    if (jwtData) {
      req.user = {
        userId: jwtData.userId,
        jwtId: jwtData.id,
      };
      next();
    } else {
      unAuthenticated(res);
    }
  } catch (error) {
    InternalServerError(res, error);
  }
}
