export interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  closingDate: Date;
  property: number;
  isComplete: boolean;
  userId: string;
  teamId: string;
}
