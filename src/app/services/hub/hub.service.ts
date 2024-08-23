import { Injectable, Signal, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class HubService {
  private readonly _hubConnection: signalR.HubConnection;

  // Connection state
  private _connectionState = signal<boolean>(false);
  connectionState = this._connectionState.asReadonly();

  // Join message list
  private _joinMessageList = signal<string[]>([]);
  joinMessageList = this._joinMessageList.asReadonly();

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
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this._hubConnection.on('onJoinChatRoom', (message: string) => {
      this._joinMessageList.update((prev) => [...prev, message]);
    });

    this._hubConnection.on(
      'onMessageReceived',
      (message: string, firstname: string, lastname: string) => {
        this._messageList.update((prev) => [
          ...prev,
          { message, firstname, lastname },
        ]);
      }
    );
  }
  joinChatRoom(teamId: string, firstname: string, lastname: string) {
    this._hubConnection.invoke('JoinChatRoom', teamId, firstname, lastname);
  }

  sendMessage(
    teamId: string,
    message: string,
    firstname: string,
    lastname: string
  ) {
    this._hubConnection.invoke(
      'SendMessage',
      teamId,
      message,
      firstname,
      lastname
    );
  }
}
