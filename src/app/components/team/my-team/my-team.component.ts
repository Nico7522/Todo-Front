import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TeamService } from '../../../services/team/team.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
      // if (this.errorMessage()) this._spinnerService.hide('all');

      // if (this.team()) this._spinnerService.hide('all');

      if (this.state() === 'loading') {
        this._spinnerService.show('all');
      } else {
        this._spinnerService.hide('all');
      }
    });
  }

  teamId = this._authService.user()?.teamId;
  // errorMessage = this._teamService.errorMessage;
  team = this._teamService.team;
  ngOnInit() {
    this._teamService.userId.set(this._authService.user()?.id ?? '');
  }
}
