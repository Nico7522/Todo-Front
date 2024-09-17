import { Component } from '@angular/core';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-testanim',
  templateUrl: './testanim.component.html',
  styleUrl: './testanim.component.scss',
  animations: [
    trigger('crossfade', [
      transition('1 <=> 2', [
        group([
          query('.active', [style({ opacity: 0, scale: 0.7 })]),
          query(':not(.active)', [
            animate('0.5s ease-out', style({ opacity: 0, scale: 0.7 })),
          ]),
          query('.active', [
            animate('0.5s ease-in', style({ opacity: 1, scale: 1 })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class TestanimComponent {
  step: 1 | 2 = 1;
}
