import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { emailRegex, passwordRegex } from '../../utils/regex';
import {
  ConfirmPasswordStateMatcher,
  hasErrorAndTouched,
  HireDateStateMatcher,
  passwordMatch,
  validHireDate,
} from '../../utils/validators';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MyTel } from '../../shared/input-phone/input-phone.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  onChange = (_: any) => {};
  private readonly _formBuilder = inject(FormBuilder);
  hasErrorAndTouched = hasErrorAndTouched;
  hireDatematcher = new HireDateStateMatcher();
  passwordMatcher = new ConfirmPasswordStateMatcher();
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
      phoneNumber: ['', Validators.required],
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
    console.log(this.registerForm.get('phoneNumber'));

    if (this.registerForm.valid) {
      console.log('valid');
    }
  }
}
