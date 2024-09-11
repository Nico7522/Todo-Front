import { Component, Inject, inject, signal } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../../enums/error.enum';
import { DialogRef } from '@angular/cdk/dialog';
import { CompleteTaskDialogComponent } from './complete-task-dialog/complete-task-dialog.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public taskId: string) {}
  private readonly _dialogRef = inject(MatDialogRef<TaskDetailsComponent>);
  private readonly _dialog = inject(MatDialog);
  private readonly _taskService = inject(TaskService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  task$ = this._taskService.getTaskById(this.taskId).pipe(
    tap((task) => console.log(task)),
    catchError((err) => {
      if (err.status === 404) {
        this._toastrService.error(Error.TASKNOTFOUND);
      } else {
        this._toastrService.error(Error.TASKNOTFETCH);
      }
      this._dialogRef.close();
      return EMPTY;
    }),
    finalize(() => this._spinnerService.hide('task-details'))
  );

  openCompleteTaskDialog() {
    let ref = this._dialog.open(CompleteTaskDialogComponent, {
      width: '300px',
      data: this.taskId,
    });

    ref.afterClosed().subscribe((taskId) => {
      if (taskId) {
        this._dialogRef.close(taskId);
      }
    });
  }
  ngOnInit() {
    this._spinnerService.show('task-details');
  }
}
