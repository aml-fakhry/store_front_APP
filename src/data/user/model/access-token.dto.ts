import { userDTO } from './user.dto';

export interface accessTokenDTO {
  id?: string;
  issuedAt: Date;
  expiresAt: Date;
  userId?: number;
}
