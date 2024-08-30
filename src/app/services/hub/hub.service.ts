import { inject, Injectable, Signal, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../../interfaces/message/message.interface';
import { HttpClient } from '@angular/common/http';
import { TeamService } from '../team/team.service';
import { catchError, EMPTY, take } from 'rxjs';
import { UserStatus } from '../../interfaces/users/user-status.interface';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class HubService {
  private readonly _hubConnection: signalR.HubConnection;
  private readonly _httpC = inject(HttpClient);
  private readonly _teamService = inject(TeamService);
  // Connection state
  private _connectionState = signal<boolean>(false);
  connectionState = this._connectionState.asReadonly();

  private _connectionId: string = '';

  // Message list
  private _messageList = signal<Message[]>([]);
  messageList = this._messageList.asReadonly();
  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7109/chat')
      .build();
  }
  connect() {
    if (this._hubConnection.state === 'Disconnected') {
      this._hubConnection
        .start()
        .then(() => {
          console.log('Connected');
          this._connectionState.set(true);
          if (this._hubConnection.connectionId)
            this._connectionId = this._hubConnection.connectionId;
        })
        .catch((err) => {
          this._connectionState.set(false);
          console.log(err);
        });
    }
    this._hubConnection.on('JoinChatRoom', (membersList: UserStatus[]) => {
      this._teamService.refreshMembersList(membersList);
    });

    this._hubConnection.on('LeftChatRoom', (membersList: UserStatus[]) => {
      this._teamService.refreshMembersList(membersList);
    });

    this._hubConnection.on(
      'ReceiveMessage',
      (message: string, firstname: string, lastname: string) => {
        this._messageList.update((prev) => [
          ...prev,
          { message, firstname, lastname },
        ]);
      }
    );
  }
  joinChatRoom(teamId: string, userId: string) {
    this._httpC
      .post(
        `${environment.API_URL}/hub/joinchatroom/${teamId}?connectionId=${this._connectionId}&teamId=${teamId}&userId=${userId}`,
        {
          isOnline: true,
        }
      )
      .subscribe();
  }

  leftChatRoom(teamId: string, userId: string) {
    this._httpC
      .post(
        `${environment.API_URL}/hub/leftchatroom/${teamId}?teamId=${teamId}&userId=${userId}`,
        {
          isOnline: false,
        }
      )

      .subscribe();
  }

  sendMessage(teamId: string, messageForm: Message) {
    this._httpC
      .post(`${environment.API_URL}/hub/sendmessage/${teamId}`, {
        ...messageForm,
      })
      .subscribe();
  }
}
