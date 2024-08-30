import { User } from './user.interface';

export type UserStatus = User & {
  isPresent: boolean;
  isOnline: boolean;
};
