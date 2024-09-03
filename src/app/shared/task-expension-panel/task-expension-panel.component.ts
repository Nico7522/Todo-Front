import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/users/user.interface';
import { Task } from '../../interfaces/tasks/task.interface';

@Component({
  selector: 'app-task-expension-panel',
  templateUrl: './task-expension-panel.component.html',
  styleUrl: './task-expension-panel.component.scss',
})
export class TaskExpensionPanelComponent {
  @Input() task: Task | null = null;
}
