export interface Task {
  includes(sq: string): unknown;
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  closingDate: Date;
  duration: number;
  priority: number;
  isComplete: boolean;
  userId: string;
  teamId: string;
}
