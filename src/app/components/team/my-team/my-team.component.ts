import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TeamService } from '../../../services/team/team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss',
})
export class MyTeamComponent {
  private readonly _authService = inject(AuthService);
  private readonly _teamService = inject(TeamService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  state = this._teamService.state;
  constructor() {
    effect(() => {
      if (this.state() === 'loading') {
        this._spinnerService.show('all');
      } else {
        this._spinnerService.hide('all');
      }
    });
  }

  teamId = this._authService.user()?.teamId;

  team = this._teamService.team;
  ngOnInit() {
    this._teamService.setUserId(this._authService.user()?.id ?? '');
  }
}
