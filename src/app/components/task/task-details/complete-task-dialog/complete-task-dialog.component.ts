import { Component, Inject, inject, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../../services/task/task.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../../../enums/error.enum';

@Component({
  selector: 'app-complete-task-dialog',
  templateUrl: './complete-task-dialog.component.html',
  styleUrl: './complete-task-dialog.component.scss',
})
export class CompleteTaskDialogComponent {
  private readonly _dialogRef = inject(
    MatDialogRef<CompleteTaskDialogComponent>
  );
  private readonly _taskService = inject(TaskService);
  private readonly _toastrService = inject(ToastrService);
  isLoading = signal<boolean>(false);
  constructor(@Inject(MAT_DIALOG_DATA) public taskId: string) {}

  duration = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)],
  });
  validate() {
    if (this.duration.valid) {
      this.isLoading.set(true);

      this._taskService
        .completeTask(this.taskId, +this.duration.value)
        .pipe(
          tap(() => {
            this._toastrService.success('Task completed');
            this._dialogRef.close(this.taskId);
          }),
          catchError((err) => {
            if (err.status === 500) {
              this._toastrService.error(Error.SERVERERROR);
            } else {
              this._toastrService.error('Task could not be updated');
            }
            return EMPTY;
          }),
          finalize(() => this.isLoading.set(false))
        )
        .subscribe();
    }
  }
}
