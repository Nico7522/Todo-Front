import { Component, Inject, inject } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../../enums/error.enum';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public taskId: string) {}
  private readonly _dialog = inject(DialogRef<TaskDetailsComponent>);
  private readonly _taskService = inject(TaskService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);

  task$ = this._taskService.getTaskById(this.taskId).pipe(
    catchError((err) => {
      if (err.status === 404) {
        this._toastrService.error(Error.TASKNOTFOUND);
      } else {
        this._toastrService.error(Error.TASKNOTFETCH);
      }
      this._dialog.close();
      return EMPTY;
    }),
    finalize(() => this._spinnerService.hide('task-details'))
  );
  ngOnInit() {
    this._spinnerService.show('task-details');
  }
}
