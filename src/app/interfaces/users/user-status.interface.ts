import { User } from './user.interface';

export type UserStatus = User & {
  status: boolean;
};
