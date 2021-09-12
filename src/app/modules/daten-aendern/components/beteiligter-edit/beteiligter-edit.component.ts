import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Adresse, Beteiligter } from '../../models/beteiligter.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-beteiligter-edit',
  templateUrl: './beteiligter-edit.component.html',
  styleUrls: ['./beteiligter-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeteiligterEditComponent implements OnInit {

  @Input() beteiligter: Beteiligter | null = null;
  @Output() onSave = new EventEmitter<void>();

  beteiligterForm: FormGroup | undefined = undefined;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.beteiligterForm = this.createForm(this.beteiligter);
    this.beteiligterForm.valueChanges.subscribe(() => console.log('Beteiligter Form value changed: ', this.beteiligterForm?.value))
  }

  onSubmit(): void {
    this.beteiligter = this.beteiligterForm?.value;
    this.onSave.emit();
  }

  private createForm(beteiligter: Beteiligter | null): FormGroup {
    if (beteiligter == null) {
      return this.fb.group({
        persontyp: this.fb.control(['']),
        natPerson: this.fb.group({
          vorname: this.fb.control(['']),
          nachname: this.fb.control(['']),
        }),
        jurPerson: this.fb.group({
          name1: this.fb.control(['']),
          name2: this.fb.control(['']),
        }),
        adressen: this.fb.array(this.createAdressArr(undefined))
      })
    }

    return this.fb.group({
      persontyp: this.fb.control([beteiligter.persontyp ?? '']),
      natPerson: this.fb.group({
        vorname: this.fb.control([beteiligter.natPerson?.vorname]),
        nachname: this.fb.control([beteiligter.natPerson?.nachname]),
      }),
      jurPerson: this.fb.group({
        name1: this.fb.control([beteiligter.jurPerson?.name1]),
        name2: this.fb.control([beteiligter.jurPerson?.name2]),
      }),
      adressen: this.fb.array(this.createAdressArr(beteiligter.adressen))
    })
  }

  private createAdressArr(adresses: Adresse[] | undefined): FormGroup[] {
    if (adresses == null || adresses.length < 1) {
      return [
        this.fb.group({
          strasseNummer: this.fb.control(['']),
        postleitzahl: this.fb.control(['']),
        ort: this.fb.control(['']),
        land: this.fb.control(['']),
        })
      ];
    }
    const array = [];
    for (let adr of adresses) {
      const group = this.fb.group({
        strasseNummer: this.fb.control([adr.strasseNummer]),
        postleitzahl: this.fb.control([adr.postleitzahl]),
        ort: this.fb.control([adr.ort]),
        land: this.fb.control([adr.land]),
      });
      array.push(group);
    }
    return array;
  }

}
