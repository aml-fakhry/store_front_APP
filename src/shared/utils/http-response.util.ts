import { Response } from 'express';
import { appRootDir } from '../../app';
import { AppError, AppErrorCode } from '../model';
import { AppHttpResponse } from './../model/app-http-response.model';

/**
 * Returns a succeeded response with 200 status code.
 * @param res The http-response to be modified.
 * @param filename An file name that will be sent within the response' body.
 */
export function OK(res: Response, filename: string): unknown {
  return filename ? res.status(200).sendFile(appRootDir + filename) : res.send();
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
