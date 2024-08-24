import { inject, Injectable, Signal, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../../interfaces/message.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HubService {
  private readonly _hubConnection: signalR.HubConnection;
  private readonly _httpC = inject(HttpClient);
  // Connection state
  private _connectionState = signal<boolean>(false);
  connectionState = this._connectionState.asReadonly();

  // Join message list
  private _joinMessageList = signal<string[]>([]);
  joinMessageList = this._joinMessageList.asReadonly();
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
    this._hubConnection.on('JoinChatRoom', (message: string) => {
      this._joinMessageList.update((prev) => [...prev, message]);
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
  joinChatRoom(teamId: string, firstname: string, lastname: string) {
    this._httpC
      .post(
        `https://localhost:7109/Join?connectionId=${this._connectionId}&teamId=${teamId}&firstname=${firstname}&lastname=${lastname}`,
        null
      )
      .subscribe();
  }

  sendMessage(
    teamId: string,
    message: string,
    firstname: string,
    lastname: string
  ) {
    this._httpC
      .post(
        `https://localhost:7109/SendMessage?message=${message}&teamId=${teamId}&firstname=${firstname}&lastname=${lastname}`,
        null
      )
      .subscribe();
  }
}
