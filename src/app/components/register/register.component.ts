import {
  Component,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailRegex, passwordRegex } from '../../utils/regex';
import {
  ConfirmPasswordStateMatcher,
  hasErrorAndTouched,
  HireDateStateMatcher,
  passwordMatch,
  validHireDate,
} from '../../utils/validators';
import { InputPhoneComponent } from '../../shared/input-phone/input-phone.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  markPhoneNumberInputAsTouched: boolean = false;
  @ViewChild('phoneInput') phoneInput!: InputPhoneComponent;
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
    console.log(this.registerForm.get('confirmPassword'));

    if (!this.registerForm.valid) {
      this.markFormAsTouched();
    }
  }

  markFormAsTouched() {
    this.registerForm.markAllAsTouched();
    this.phoneInput.markAsTouched();
  }
}
