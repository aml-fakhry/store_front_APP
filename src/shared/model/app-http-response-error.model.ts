import { AppErrorCode } from './app-error-code.model';
import { AppError } from './app-error-model';

/**
 * The application-specific response error.
 */
export interface AppHttpResponseError {
  code?: AppErrorCode;
  source?: string;
  title?: AppError;
  detail?: string;
}
