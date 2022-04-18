import { AppHttpResponseError } from './app-http-response-error.model';

/**
 * The application-specific response.
 */
export interface AppHttpResponse {
  data?: unknown;
  errors?: AppHttpResponseError[];
}
