import {
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { catchError, EMPTY, Subject, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { TeamService } from '../../services/team/team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../enums/error.enum';
import { FormControl } from '@angular/forms';
import { HubService } from '../../services/hub/hub.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _teamService = inject(TeamService);
  private readonly _hubService = inject(HubService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  errorMessage = signal<string>('');
  team = this._teamService.team;
  hubState = this._hubService.state;
  teamState = this._teamService.state;
  isLoading = signal<boolean>(false);
  subject = new Subject<void>();
  constructor() {
    effect(() => {
      if (this.teamState() === 'error') {
        this._toastrService.error(Error.TEAMNOTFETCH);
      }
    });
  }

  notes = signal<string[]>([]);
  newNote = new FormControl('');
  isTokenExist = this._authService.isTokenExist;
  user = this._authService.user;

  user$ = this.getUserById(this.user()?.id ?? '').pipe(
    tap(() => {
      this._teamService.setUserId(this.user()?.id ?? '');
      this._spinnerService.hide('all');
    }),
    catchError((err) => {
      this._spinnerService.hide('all');
      if (!this._toastrService.currentlyActive) {
        if (err.status === 404) {
          this._toastrService.error(Error.USERNOTFOUND);
        } else {
          this._toastrService.error(Error.SERVERERROR);
        }
      }

      return EMPTY;
    })
  );

  private getUserById(userId: string) {
    return this._userService.getUserById(userId);
  }

  saveNote() {
    this.notes.update((prevNotes) => [
      ...prevNotes,
      this.newNote.value as string,
    ]);
    localStorage.setItem('notes', JSON.stringify(this.notes()));
  }

  deleteNote(index: number) {
    this.notes.update((prevNote) => {
      let spliceArray = prevNote.splice(index, 1);
      return prevNote;
    });
    this.setOnLocalStorage(this.notes(), 'notes');
  }

  ngOnInit() {
    let notes = localStorage.getItem('notes');
    if (notes) this.notes.set(JSON.parse(notes));
  }

  setOnLocalStorage<T>(item: T, key: string): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(item));
  }

  sendPresence() {
    this.isLoading.set(true);
    if (this.hubState() !== 'success') {
      this._hubService
        .connect()
        .then(() => {
          this._hubService.sendPresence(this.user()?.id ?? '');
          this._toastrService.success('Presence has been sent');
        })
        .catch(() => {
          this._toastrService.error("Couldn't connect to the server");
        })
        .finally(() => this.isLoading.set(false));
    } else {
      this._hubService.sendPresence(this.user()?.id ?? '');
      this.isLoading.set(false);
    }
  }
}
