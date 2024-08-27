import { Component, effect, inject } from '@angular/core';
import { HubService } from '../../../services/hub/hub.service';
import { AuthService } from '../../../services/auth/auth.service';
import { LoggedUser } from '../../../interfaces/users/logged-user.interface';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  private readonly _hubService = inject(HubService);
  private readonly _authService = inject(AuthService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  user = this._authService.user();
  teamId: string = '';
  isTokenExist = this._authService.isTokenExist;
  messageList = this._hubService.messageList;
  connectionState = this._hubService.connectionState;
  message = new FormControl('', { nonNullable: true });
  joinMessageList = this._hubService.joinMessageList;
  constructor() {
    this.teamId = this._activatedRoute.snapshot.params['teamId'];
    effect(() => {
      if (this._hubService.connectionState()) {
        if (this.user) {
          this._hubService.joinChatRoom(
            this.teamId,
            this.user.firstname,
            this.user.lastname
          );
        }
      }
    });
  }

  sendMessage() {
    if (this.user && this.message.valid) {
      const messageForm: Message = {
        message: this.message.value,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
      };
      this._hubService.sendMessage(this.user.teamId, messageForm);
      this.message.reset();
    }
  }
  ngOnInit() {
    this._hubService.connect();
  }
}
