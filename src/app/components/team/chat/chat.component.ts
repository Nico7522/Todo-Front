import { Component, effect, inject, signal } from '@angular/core';
import { HubService } from '../../../services/hub/hub.service';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../interfaces/message/message.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { TeamService } from '../../../services/team/team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

const hidden = { transform: 'translateX(20%)' };
const visible = { transform: 'translateX(0)' };
const timing = '0.3s ease-in';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [style(hidden), animate(timing, style(visible))]),
      transition(':leave', [style(visible), animate(timing, style(hidden))]),
    ]),
  ],
})
export class ChatComponent {
  private readonly _hubService = inject(HubService);
  private readonly _authService = inject(AuthService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _teamService = inject(TeamService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  user = this._authService.user();
  teamId: string = '';
  hubState = this._hubService.hubState;
  teamMembers = this._teamService.teamMembers;
  isTokenExist = this._authService.isTokenExist;
  messageList = this._hubService.messageList;

  message = new FormControl('', { nonNullable: true });
  constructor() {
    this.teamId = this._activatedRoute.snapshot.params['teamId'];
    effect(() => {
      if (this.hubState().isConnected && this.teamMembers().length > 0) {
        if (this.user) {
          this._hubService.joinChatRoom(this.teamId, this.user.id);
        }
      }

      if (this.hubState().isLoading) {
        this._spinnerService.show('all');
      } else {
        this._spinnerService.hide('all');
      }

      if (this.hubState().isError) {
        console.log('error');

        this._toastrService.error('Server error');
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
    if (!this.hubState().isConnected) {
      this._hubService.connect();
    }

    this._teamService.userId.set(this.user?.id ?? '');
  }

  ngOnDestroy() {
    if (this.user) this._hubService.leftChatRoom(this.teamId, this.user.id);
  }
}
