import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/tasks/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-tasks-display',
  templateUrl: './tasks-display.component.html',
  styleUrl: './tasks-display.component.scss',
})
export class TasksDisplayComponent {
  private readonly _dialog = inject(MatDialog);
  @Input() tasks: Task[] = [];
  @Input() tasksInTeam: boolean = false;
  @Output() taskToUpdateEmmiter = new EventEmitter<string>();
  emitTaskToUpdate(completedTaskId: string) {
    this.taskToUpdateEmmiter.emit(completedTaskId);
  }
  openTaskDetailsDialog(taskId: string) {
    let ref = this._dialog.open(TaskDetailsComponent, {
      width: '600px',
      height: '600px',
      data: { taskId: taskId, taskInTeam: this.tasksInTeam },
    });

    ref.afterClosed().subscribe((completedTaskId: string) => {
      this.emitTaskToUpdate(completedTaskId);
    });
  }
  displayedColumns: string[] = ['title', 'priority', 'details', 'advancement'];
}
