import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlDirective,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
export class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string,
    public final: string
  ) {}
}
@Component({
  selector: 'input-phone',
  templateUrl: './input-phone.component.html',
  styleUrl: './input-phone.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: InputPhoneComponent },
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  },
})
export class InputPhoneComponent
  implements ControlValueAccessor, MatFormFieldControl<MyTel>, OnDestroy
{
  static nextId = 0;
  @ViewChild('area') areaInput!: HTMLInputElement;
  @ViewChild('exchange') exchangeInput!: HTMLInputElement;
  @ViewChild('subscriber') subscriberInput!: HTMLInputElement;
  @ViewChild('final') finalInput!: HTMLInputElement;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'example-tel-input';
  id = `example-tel-input-${InputPhoneComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {};
  onTouched = () => {};
  onFocus(control: AbstractControl): void {
    control.markAsTouched();
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.parts.touched;
  }
  get empty() {
    const {
      value: { area, exchange, subscriber, final },
    } = this.parts;

    return !area && !exchange && !subscriber && !final;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder!: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MyTel | null {
    if (this.parts.valid) {
      const {
        value: { area, exchange, subscriber, final },
      } = this.parts;
      return new MyTel(area, exchange, subscriber, final);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    const { area, exchange, subscriber, final } =
      tel || new MyTel('', '', '', '');
    this.parts.setValue({ area, exchange, subscriber, final });
    this.stateChanges.next();
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.parts = formBuilder.group({
      area: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      exchange: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      subscriber: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      final: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
    });

    _focusMonitor.monitor(_elementRef, true).subscribe((origin) => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && !!nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if (this.parts.controls['subscriber'].valid) {
      this._focusMonitor.focusVia(this.finalInput, 'program');
    } else if (this.parts.controls['exchange'].valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls['area'].valid) {
      this._focusMonitor.focusVia(this.exchangeInput, 'program');
    } else if (this.parts.controls['area'].valid) {
      this._focusMonitor.focusVia(this.finalInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }

    // area / exchange / subcsciber
  }

  writeValue(tel: MyTel | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;
}
