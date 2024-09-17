import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss',
})
export class UpdateTaskComponent {
  private readonly _formBuilder = inject(NonNullableFormBuilder);

  updateTaskForm = this._formBuilder.group({
    title: [],
    description: [],
    priority: [],
  });
}
