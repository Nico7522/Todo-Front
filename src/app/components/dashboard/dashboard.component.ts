import { Component, computed, inject, Signal, signal } from '@angular/core';
import { catchError, EMPTY, filter, Subject, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { TeamService } from '../../services/team/team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../enums/error.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _teamService = inject(TeamService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  errorMessage = signal<string>('');
  subject = new Subject<void>();
  constructor() {}

  notes = signal<string[]>([]);
  newNote = new FormControl('');
  isTokenExist = this._authService.isTokenExist;
  user = this._authService.user;

  user$ = this.getUserById(this.user()?.id ?? '').pipe(
    tap(() => {
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
  team$ = this.user$.pipe(
    switchMap((user) =>
      this.getTeamByUserId(user.id).pipe(
        catchError((err) => {
          if (err.status === 404) {
            this._toastrService.error(Error.TEAMNOTFETCH);
          } else {
            this._toastrService.error(Error.SERVERERROR);
          }
          return EMPTY;
        })
      )
    )
  );

  private getUserById(userId: string) {
    return this._userService.getUserById(userId);
  }

  private getTeamByUserId(userId: string) {
    return this._teamService.getTeamByUserId(userId);
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
    console.log(this.user()?.id);

    let notes = localStorage.getItem('notes');
    if (notes) this.notes.set(JSON.parse(notes));
  }

  setOnLocalStorage<T>(item: T, key: string): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(item));
  }
}
