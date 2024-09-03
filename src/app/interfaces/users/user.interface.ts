import { Team } from '../teams/team.interface';

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  hiredate: Date;
  birthdate: Date;
  tasks: any[];
  team: Team;
}
