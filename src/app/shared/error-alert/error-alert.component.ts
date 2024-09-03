import { Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss',
  animations: [
    trigger('inAnimation', [
      transition(':enter', [
        style({ translate: '0 -300%' }),
        animate('0.5s ease-out', style({ translate: '0' })),
      ]),
    ]),
  ],
})
export class ErrorAlertComponent {
  @Input() errorMessage: string = '';
}
