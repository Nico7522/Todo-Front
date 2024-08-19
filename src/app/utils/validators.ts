import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const passwordMatch: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let password = control.get('password');
  let passwordConfirm = control.get('passwordConfirm');
  if (password && passwordConfirm && password.value != passwordConfirm.value) {
    return {
      passwordMatchError: true,
    };
  }
  return null;
};
export const validHireDate: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let birthdate: string = control.get('birthdate')?.value;
  let hiredate: string = control.get('hiredate')?.value;

  if (new Date(birthdate) >= new Date(hiredate)) {
    return {
      wrongHireDate: true,
    };
  }

  return null;
};

export const hasErrorAndTouched = (
  form: FormGroup,
  input: string,
  validator: string
): boolean | undefined => {
  return (
    form.get(input)?.hasError(validator) &&
    (form.get(input)?.touched || form.get(input)?.dirty)
  );
};

export class HireDateStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      form &&
      (form?.errors?.['wrongHireDate'] ||
        (control.errors?.['required'] && control.touched))
    );
  }
}

export class ConfirmPasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      form &&
      (form?.errors?.['passwordMatchError'] ||
        (control.errors?.['required'] && control.touched))
    );
  }
}
