export interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  closingDate: Date;
  priority: number;
  isComplete: boolean;
  userId: string;
  teamId: string;
}
