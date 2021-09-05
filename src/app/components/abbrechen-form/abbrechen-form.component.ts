import { Component, OnInit } from '@angular/core';
import { EntscheidungForm } from '../../shared/entscheidung-form';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-abbrechen-form',
  templateUrl: './abbrechen-form.component.html',
  styleUrls: ['./abbrechen-form.component.scss'],
})
export class AbbrechenFormComponent
  extends EntscheidungForm<
    { param1: string; param2: string },
    { param1: string; param2: string }
  >
  implements OnInit
{

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  abbrechenForm: FormGroup = this.createForm(undefined);

  ngOnInit() {
    this.abbrechenForm = this.createForm(this.input);
    this.abbrechenForm = this.createForm(undefined);
    this.abbrechenForm.valueChanges.subscribe(() =>
      console.log('Form value changed, form valid: ', this.abbrechenForm.valid)
    );
  }

  doSomething(): void {
    console.log('doSomething()->abbrechen');
  }

  click(): void {
    console.log('Submitting value: ', this.abbrechenForm.value);
    this.submit.emit(this.abbrechenForm.value);
  }

  private createForm(
    value: { param1: string; param2: string } | undefined
  ): FormGroup {
    return this.fb.group({
      param1: this.fb.control(value?.param1 ?? '', Validators.required),
      param2: this.fb.control(value?.param2 ?? '', Validators.required),
    });
  }
}
