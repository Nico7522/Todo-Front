import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/tasks/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskAction } from '../../interfaces/tasks/action.type';

@Component({
  selector: 'app-tasks-display',
  templateUrl: './tasks-display.component.html',
  styleUrl: './tasks-display.component.scss',
})
export class TasksDisplayComponent {
  private readonly _dialog = inject(MatDialog);
  @Input() tasks: Task[] = [];
  @Input() tasksInTeam: boolean = false;
  @Input() leaderId?: string;
  @Output() taskToUpdateEmitter = new EventEmitter<TaskAction>();
  emitTaskToUpdate(completedTaskId: string) {
    this.taskToUpdateEmitter.emit({
      taskId: completedTaskId,
      action: 'complete',
    });
  }

  @Output() taskToUnassignEmitter = new EventEmitter<TaskAction>();
  emitTaskToUnassign(unassignedTaskId: string) {
    this.taskToUnassignEmitter.emit({
      taskId: unassignedTaskId,
      action: 'unassign',
    });
  }

  openTaskDetailsDialog(taskId: string) {
    let ref = this._dialog.open(TaskDetailsComponent, {
      width: '600px',
      height: '550px',
      data: {
        taskId: taskId,
        taskInTeam: this.tasksInTeam,
        leaderId: this.leaderId,
      },
    });

    ref.afterClosed().subscribe((data: TaskAction) => {
      if (data) {
        if (data.action === 'unassign') {
          this.emitTaskToUnassign(data.taskId);
        } else {
          this.emitTaskToUpdate(data.taskId);
        }
      }
    });
  }
  displayedColumns: string[] = ['title', 'priority', 'details', 'advancement'];
}
