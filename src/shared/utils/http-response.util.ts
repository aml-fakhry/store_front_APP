import { Response } from 'express';
import { appRootDir } from '../../app';
import { AppError, AppErrorCode } from '../model';
import { AppHttpResponse } from './../model/app-http-response.model';

/**
 * Returns a succeeded response with 200 status code.
 * @param res The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
export function OK(res: Response, body?: AppHttpResponse): unknown {
  return body ? res.status(200).send(body) : res.send();
}

/**
 * Returns a not found response with 404 status code.
 * @param res The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
export function NotFound(res: Response, body?: AppHttpResponse): Response {
  return body ? res.status(404).send(body) : res.status(404).send();
}

/**
 * Returns a unauthenticated user with 401 status code.
 * @param res The http-response to be modified.
 */
export function unAuthenticated(res: Response) {
  const body = {
    code: AppErrorCode.UnAuthenticated,
    title: AppError.UnAuthenticated,
    detail: 'No valid access token provided',
  };
  return res.status(401).send(body);
}

/**
 * Returns a forbidden user with 403 status code.
 * @param res The http-response to be modified.
 */
export function Forbidden(res: Response) {
  const body = {
    code: AppErrorCode.Forbidden,
    title: AppError.Forbidden,
    detail: 'No valid access token provided',
  };
  return res.status(403).send(body);
}

/**
 * Returns an internal server error response with 500 status code.
 * @param res The http-response to be modified.
 * @param err The error or error-message to be sent within the response' body.
 */
export function InternalServerError(res: Response, err: string | Error): Response {
  const body: AppHttpResponse = {
    errors: [
      {
        code: AppErrorCode.InternalServerError,
        title: AppError.InternalServerError,
        detail: typeof err === 'string' ? err : err.message,
      },
    ],
  };
  return res.status(500).send(body);
}
