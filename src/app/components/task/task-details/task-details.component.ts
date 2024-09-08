import { Component, Inject, inject } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public taskId: string) {}
  private readonly _taskService = inject(TaskService);
  private readonly _spinnerService = inject(NgxSpinnerService);

  task$ = this._taskService.getTaskById(this.taskId).pipe(
    catchError((err) => {
      return EMPTY;
    }),
    finalize(() => this._spinnerService.hide('task-details'))
  );
  ngOnInit() {
    this._spinnerService.show('task-details');
    console.log(this.taskId);
  }
}
