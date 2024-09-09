import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-task-dialog',
  templateUrl: './complete-task-dialog.component.html',
  styleUrl: './complete-task-dialog.component.scss',
})
export class CompleteTaskDialogComponent {
  private readonly _dialogRef = inject(
    MatDialogRef<CompleteTaskDialogComponent>
  );
  duration = new FormControl('', {
    nonNullable: true,
    validators: Validators.required,
  });
  validate() {
    if (this.duration.valid) {
      this._dialogRef.close(this.duration.value);
    }
  }
}
