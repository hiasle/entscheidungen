import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControlName,
  FormGroup,
} from '@angular/forms';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Beteiligter, PersonTyp } from '../../models/beteiligter.model';
import { BeteiligteFormService } from '../../services/beteiligte-form.service';
import { BeteiligteService } from '../../services/beteiligte.service';
import { extractName, mergeBeteiligter } from '../../utils/beteiligte-utils';
import { GenericValidator } from '../../utils/generic-validator.utils';
import { Rolle } from '../../models/beteiligter.model';

type PersonTypKeys = keyof typeof PersonTyp;
type RollenTypKeys = keyof typeof Rolle;

const MIN_LENGTH = 4;
const MIN_LENGTH_MSG = (key: string) =>
  `${key} muss mindestens ${MIN_LENGTH} Zeichen haben!`;

const VALIDATION_MESSAGES = {
  vorname: {
    required: 'Muss angegeben werden!',
    minlength: MIN_LENGTH_MSG('Vorname'),
  },
  nachname: {
    required: 'Nachname muss angegeben werden!',
    minlength: MIN_LENGTH_MSG('Nachname'),
  },
  name1: {
    required: 'Muss angegeben werden!',
    minlength: MIN_LENGTH_MSG('Name1'),
  },
};

@Component({
  selector: 'app-beteiligter-edit',
  templateUrl: './beteiligter-edit.component.html',
  styleUrls: ['./beteiligter-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeteiligterEditComponent implements OnInit, OnDestroy {
  // Access every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  @Input() beteiligter: Beteiligter | undefined = undefined;
  @Output() onSave = new EventEmitter<Beteiligter>();

  beteiligterForm: FormGroup;

  rollen: Rolle[] = [
    Rolle.AnzeigendeBerichtendeStelle,
    Rolle.Beschuldigter,
    Rolle.Opfer,
    Rolle.Sonstiger,
    Rolle.Verteidiger,
    Rolle.Zeuge,
  ];

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator;

  private readonly destroy$ = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly bs: BeteiligteService,
    private readonly bfs: BeteiligteFormService
  ) {
    this.beteiligterForm = this.bfs.createForm(undefined, MIN_LENGTH);
    this.genericValidator = new GenericValidator(VALIDATION_MESSAGES);
  }

  ngOnInit(): void {
    this.beteiligterForm = this.bfs.createForm(this.beteiligter, MIN_LENGTH);
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );
    // Merge the blur event observable with the valueChanges observable
    merge(this.beteiligterForm.valueChanges, controlBlurs)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(
          this.beteiligterForm
        );
      });

    this.beteiligterForm.controls['persontyp'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: PersonTyp) => {
        switch (value) {
          case PersonTyp.juristisch:
            this.beteiligterForm.controls['natPerson'].disable();
            this.beteiligterForm.controls['jurPerson'].enable();
            return;
          case PersonTyp.natuerlich:
            this.beteiligterForm.controls['natPerson'].enable();
            this.beteiligterForm.controls['jurPerson'].disable();
            return;
        }
      });

    this.beteiligterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        console.log('Beteiligter Form changed: ', this.beteiligterForm.value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    const savedOne = this.beteiligterForm?.value as Partial<Beteiligter>;
    if (this.beteiligter != null) {
      this.beteiligter = mergeBeteiligter(this.beteiligter, savedOne);
      this.onSave.emit(this.beteiligter);
      this.bs.saveBeteiligter(this.beteiligter);
    }
  }

  abbrechen(): void {
    this.bs.clearBeteiligterEdit();
  }

  get name(): string {
    return extractName(this.beteiligter);
  }

  get juristisch(): boolean {
    return (
      this.beteiligterForm.controls['persontyp'].value === PersonTyp.juristisch
    );
  }

  get natuerlich(): boolean {
    return (
      this.beteiligterForm.controls['persontyp'].value === PersonTyp.natuerlich
    );
  }

  get persontypes(): string[] {
    return Object.keys(PersonTyp) as PersonTypKeys[];
  }

  get adressen(): FormArray {
    return this.beteiligterForm.controls['adressen'] as FormArray;
  }

  addAdress() {
    (<FormArray>this.beteiligterForm.controls['adressen']).push(
      this.bfs.createAdressGroup(undefined)
    );
  }
}
