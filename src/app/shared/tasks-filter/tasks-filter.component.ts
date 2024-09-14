import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Task } from '../../interfaces/tasks/task.interface';

@Component({
  selector: 'app-tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrl: './tasks-filter.component.scss',
})
export class TasksFilterComponent {
  @Output() onSearchUpdatedEmmiter = new EventEmitter<string>();
  onSearchUpdated(sq: string) {
    this.onSearchUpdatedEmmiter.emit(sq);
  }

  @Output() onPriorityUpdatedEmmiter = new EventEmitter<string>();
  onPriorityUpdated(priority: string) {
    this.onPriorityUpdatedEmmiter.emit(priority);
  }
  @Output() onTaskDoneChangeEmmiter = new EventEmitter<boolean>();
  onTaskDoneChange(value: boolean) {
    this.onTaskDoneChangeEmmiter.emit(value);
  }
}
