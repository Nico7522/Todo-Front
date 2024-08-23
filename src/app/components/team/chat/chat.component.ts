import { Component, effect, inject } from '@angular/core';
import { HubService } from '../../../services/hub/hub.service';
import { AuthService } from '../../../services/auth/auth.service';
import { LoggedUser } from '../../../interfaces/logged-user.interface';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  private readonly _hubService = inject(HubService);
  private readonly _authService = inject(AuthService);
  user = this._authService.user();
  isTokenExist = this._authService.isTokenExist;
  messageList = this._hubService.messageList;
  connectionState = this._hubService.connectionState;
  message = new FormControl('', { nonNullable: true });
  joinMessageList = this._hubService.joinMessageList;
  constructor() {
    effect(() => {
      if (this._hubService.connectionState()) {
        if (this.user) {
          this._hubService.joinChatRoom(
            this.user.teamId,
            this.user.firstname,
            this.user.lastname
          );
        }
      }
    });
  }

  sendMessage() {
    console.log(this.message.value);
    if (this.user && this.message.valid) {
      this._hubService.sendMessage(
        this.user.teamId,
        this.message.value,
        this.user.firstname,
        this.user.lastname
      );
    }
  }
  ngOnInit() {
    this._hubService.connect();
  }
}
