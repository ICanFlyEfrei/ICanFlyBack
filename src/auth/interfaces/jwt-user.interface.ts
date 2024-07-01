import { UserTypes } from '../../shared/api-enums';

export interface JwtUser {
  userId: string;
  role: UserTypes;
}
