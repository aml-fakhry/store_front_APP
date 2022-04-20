/**
 * The application-specific errors.
 */
export enum AppError {
  IsRequired = 'The field is required',
  ValueExists = 'The entity field value already exists in another entity',
  IncorrectValue = `The value is not correct or doesn't meets the expected value criteria`,
  UnAuthenticated = 'User is not authenticated',
  Forbidden = 'Access denied or forbidden',
  InternalServerError = 'Internal server error',
}
