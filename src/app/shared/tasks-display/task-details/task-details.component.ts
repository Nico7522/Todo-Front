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
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';
import { TaskModalData } from '../../../interfaces/tasks/task-modal-data.interface';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
  providers: [TaskService],
})
export class TaskDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskModalData) {}
  private readonly _dialogRef = inject(MatDialogRef<TaskDetailsComponent>);
  private readonly _dialog = inject(MatDialog);
  private readonly _taskService = inject(TaskService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  task$ = this._taskService.getTaskById(this.data.taskId).pipe(
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
      data: this.data,
    });

    ref.afterClosed().subscribe((taskId) => {
      if (taskId) {
        this._dialogRef.close(taskId);
      }
    });
  }

  deleteTask() {
    let ref = this._dialog.open(ConfirmationModalComponent, {
      height: '200px',
      width: '600px',
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }
  ngOnInit() {
    this._spinnerService.show('task-details');
  }
}
