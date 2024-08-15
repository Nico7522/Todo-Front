import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { emailRegex, passwordRegex } from '../../utils/regex';
import {
  hasErrorAndTouched,
  MyErrorStateMatcher,
  passwordMatch,
  validHireDate,
} from '../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  hasErrorAndTouched = hasErrorAndTouched;
  matcher = new MyErrorStateMatcher();
  registerForm = this._formBuilder.group(
    {
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(emailRegex)],
      ],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(passwordRegex)],
      ],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthdate: ['', Validators.required],
      hiredate: ['', Validators.required],
    },
    {
      validators: [passwordMatch, validHireDate],
    }
  );
  cols: number = 2;
  ngOnInit() {
    this.cols = 2;
    this.cols = window.innerWidth >= 1000 ? 2 : 1;
  }

  handleSubmit() {
    console.log(this.registerForm.errors?.['wrongHireDate']);

    if (this.registerForm.valid) {
      console.log('OK');
    }
  }
}
