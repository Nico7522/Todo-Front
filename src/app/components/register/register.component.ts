import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  cols: number = 2;
  ngOnInit() {
    this.cols = 2;
    this.cols = window.innerWidth >= 1000 ? 2 : 1;
  }
}
