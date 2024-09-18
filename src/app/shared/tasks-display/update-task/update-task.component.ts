import { Component, inject, Input } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Task } from '../../../interfaces/tasks/task.interface';
import { TeamService } from '../../../services/team/team.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Error } from '../../../enums/error.enum';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss',
})
export class UpdateTaskComponent {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _teamService = inject(TeamService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  @Input() task!: Task;
  updateTaskForm = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['', Validators.required],
  });

  handleSubmit() {
    if (this.updateTaskForm.valid) {
      this._spinnerService.show('task-details');
      this._teamService
        .updateTeamTask(this.task.teamId, this.task.id, {
          ...this.updateTaskForm.getRawValue(),
          priority: +this.updateTaskForm.getRawValue().priority,
        })
        .pipe(
          tap(() => this._toastrService.success('Task updated')),
          catchError((err) => {
            console.log(err);

            if (err.status === 403 || err.status === 404) {
              this._toastrService.error(err.error);
            } else if (Array.isArray(err.error)) {
              this._toastrService.error('Invalid');
            } else {
              this._toastrService.error(Error.SERVERERROR);
            }
            return EMPTY;
          }),
          finalize(() => this._spinnerService.hide('task-details'))
        )
        .subscribe();
    }
  }

  ngOnInit() {
    this.updateTaskForm.patchValue({
      ...this.task,
      priority: this.task.priority.toString(),
    });
  }
}
