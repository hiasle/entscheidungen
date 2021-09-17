import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChildren,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fromEvent, merge, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/operators';
import { GenericValidator } from '../../../utils/generic-validator.utils';

const MIN_LENGTH = 4;
const MIN_LENGTH_MSG = (key: string) =>
  `${key} muss mindestens ${MIN_LENGTH} Zeichen haben!`;

const VALIDATION_MESSAGES = {
  strasseNummer: {
    required: 'Muss angegeben werden!',
    minlength: MIN_LENGTH_MSG('Strassennummer'),
  },
  postleitzahl: {
    required: 'Postleitzahl muss angegeben werden!',
    minlength: 'Darf nicht mehr als 7 Zeichen haben',
  },
};

@Component({
  selector: 'app-adress-control',
  templateUrl: './adress-control.component.html',
  styleUrls: ['./adress-control.component.scss'],
})
export class AdressControlComponent
  implements ControlValueAccessor, AfterViewInit
{
  // Access every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  @Input()
  adressGroup: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator;

  private readonly destroy$ = new Subject();

  constructor(private readonly fb: FormBuilder) {
    this.genericValidator = new GenericValidator(VALIDATION_MESSAGES);

    this.adressGroup = fb.group({
      strasseNummer: [''],
      postleitzahl: [''],
      ort: [''],
      land: [''],
    });
  }

  ngAfterViewInit(): void {
    this.adressGroup.controls['strasseNummer'].addValidators([
      Validators.required,
      Validators.minLength(MIN_LENGTH),
    ]);
    this.adressGroup.controls['postleitzahl'].addValidators([
      Validators.required,
      Validators.minLength(7),
    ]);
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );
    // Merge the blur event observable with the valueChanges observable
    merge(this.adressGroup.valueChanges, controlBlurs)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(
          this.adressGroup
        );
      });
  }

  writeValue(value: any): void {
    if (value) {
      this.adressGroup.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.adressGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {}
}
