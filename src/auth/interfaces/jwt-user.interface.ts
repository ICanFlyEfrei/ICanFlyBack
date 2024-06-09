import { UserRoles } from '../../shared/api-enums';

export interface JwtUser {
  userId: string;
  role: UserRoles;
}
