import { AppHttpResponseError } from './app-http-response-error.model';
/**
 * The data expected returned result.
 */
export interface DataResult {
  /* Gets and sets result from operations. */
  data: {};

  /* Gets or sets validation errors that prevent process complete. */
  validationErrors: AppHttpResponseError[];

  /* Use when check existence. */
  isNotFound: boolean;

  /* Gets or sets error that prevent process complete. */
  error: Error;
}
