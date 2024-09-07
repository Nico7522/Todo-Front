import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../../interfaces/tasks/task.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss',
})
export class MyTasksComponent {
  private readonly _authService = inject(AuthService);

  private readonly _userService = inject(UserService);
  user = this._authService.user;
  tasks = signal<Task[]>([]);
  noFilteredTasks = signal<Task[]>([]);
  task$ = this._userService.getUserById(this.user()?.id ?? '').pipe(
    map((u) => {
      const dataSource = new MatTableDataSource<Task>();
      dataSource.data = u.tasks;
      this.tasks.set(u.tasks);
      this.noFilteredTasks.set(u.tasks);

      return dataSource;
    })
  );

  displayedColumns: string[] = ['title', 'priority', 'details', 'advancement'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    this.tasks.update((prev) => {
      const original = this.noFilteredTasks();
      if (filterValue !== '') {
        const filter = prev.filter((t) =>
          t.title.toLowerCase().includes(filterValue.toLowerCase())
        );
        return filter;
      }
      return original;
    });
  }
}
