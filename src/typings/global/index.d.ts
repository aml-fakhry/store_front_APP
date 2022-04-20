declare namespace Express {
  export interface Request {
    user: {
      userId: number;
      jwtId: number;
    };
  }
}
