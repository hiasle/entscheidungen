import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  Adresse,
  Beteiligter,
  PersonTyp
} from '../../models/beteiligter.model';
import { BeteiligteService } from '../../services/beteiligte.service';
import { extractName, merge } from '../../utils/beteiligte-utils';
import { map } from 'rxjs/operators';

type PersonTypKeys = keyof typeof PersonTyp;

@Component({
  selector: 'app-beteiligter-edit',
  templateUrl: './beteiligter-edit.component.html',
  styleUrls: ['./beteiligter-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeteiligterEditComponent implements OnInit {
  @Input() beteiligter: Beteiligter | undefined = undefined;
  @Output() onSave = new EventEmitter<Beteiligter>();

  beteiligterForm: FormGroup | undefined = undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bs: BeteiligteService
  ) {}

  ngOnInit(): void {
    this.beteiligterForm = this.createForm(this.beteiligter);
    this.beteiligterForm.valueChanges.subscribe(() =>
      console.log(
        'Beteiligter Form value changed: ',
        this.beteiligterForm?.value
      )
    );
  }

  onSubmit(): void {
    const savedOne = this.beteiligterForm?.value as Partial<Beteiligter>;
    if (this.beteiligter != null) {
      this.beteiligter = merge(this.beteiligter, savedOne);
      this.onSave.emit(this.beteiligter);
      this.bs.saveBeteiligter(this.beteiligter);
    }
  }

  get name(): string {
    return extractName(this.beteiligter);
  }

  get juristisch(): boolean {
    return this.beteiligterForm?.controls['persontyp'].value === PersonTyp.juristisch;
  }

  get natuerlich(): boolean {
    return this.beteiligterForm?.controls['persontyp'].value === PersonTyp.natuerlich;
  }

  get persontypes(): string[] {
    return Object.keys(PersonTyp) as PersonTypKeys[];
  }

  get adressen(): FormArray {
    return this.beteiligterForm?.controls['adressen'] as FormArray;
  }

  addAdress() {
    (<FormArray>this.beteiligterForm?.controls['adressen']).push(this.createAdressGroup(undefined));
  }

  private createForm(beteiligter: Beteiligter | undefined): FormGroup {
    if (beteiligter == null) {
      const formgroup = this.fb.group({
        persontyp: this.fb.control('natuerlich'),
        natPerson: this.fb.group({
          vorname: this.fb.control(''),
          nachname: this.fb.control(''),
        }),
        jurPerson: this.fb.group({
          name1: this.fb.control(''),
          name2: this.fb.control(''),
        }),
        adressen: this.fb.array(this.createAdressArr(undefined)),
      });
      return formgroup;
    }

    const formgroup = this.fb.group({
      persontyp: this.fb.control(beteiligter.persontyp ?? PersonTyp.natuerlich),
      natPerson: this.fb.group({
        vorname: this.fb.control(beteiligter.natPerson?.vorname),
        nachname: this.fb.control(beteiligter.natPerson?.nachname),
      }),
      jurPerson: this.fb.group({
        name1: this.fb.control(beteiligter.jurPerson?.name1),
        name2: this.fb.control(beteiligter.jurPerson?.name2),
      }),
      adressen: this.fb.array(this.createAdressArr(beteiligter.adressen)),
    });
    return formgroup;
  }

  private createAdressArr(adresses: Adresse[] | undefined): FormGroup[] {
    if (adresses == null || adresses.length < 1) {
      return [this.createAdressGroup(undefined)];
    }
    const array = [];
    for (let adr of adresses) {
      array.push(this.createAdressGroup(adr));
    }
    return array;
  }

  private createAdressGroup(adress: Adresse | undefined): FormGroup {
    if (adress == null) {
      return this.fb.group({
        strasseNummer: this.fb.control(''),
        postleitzahl: this.fb.control(''),
        ort: this.fb.control(''),
        land: this.fb.control(''),
      });
    }

    return this.fb.group({
      strasseNummer: this.fb.control(adress.strasseNummer),
      postleitzahl: this.fb.control(adress.postleitzahl),
      ort: this.fb.control(adress.ort),
      land: this.fb.control(adress.land),
    });
  }
}
