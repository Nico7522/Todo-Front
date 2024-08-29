import { Component, Input } from '@angular/core';
import { UserStatus } from '../../interfaces/users/user-status.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @Input() users: UserStatus[] | null = null;
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() iconColor: string = '';
}
