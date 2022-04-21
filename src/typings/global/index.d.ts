declare namespace Express {
  export interface Request {
    /**
     * Gets or set the user that owns the current http request.
     */
    user: {
      userId: number;
      jwtId: string;
    };
  }
}
