import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Task } from '../../interfaces/tasks/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient);

  getTaskById(taskId: string): Observable<Task> {
    return this._httpClient.get<Task>(`${environment.API_URL}/todo/${taskId}`);
  }
  constructor() {}
}
