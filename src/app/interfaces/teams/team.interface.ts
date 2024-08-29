import { Task } from '../tasks/task.interface';
import { User } from '../users/user.interface';

export interface Team {
  id: string;
  leaderId: string;
  isActive: boolean;
  name: string;
  users: User[];
  tasks: Task[];
}
