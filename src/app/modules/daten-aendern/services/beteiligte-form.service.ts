import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Adresse, Beteiligter, PersonTyp } from '../models/beteiligter.model';

@Injectable({
  providedIn: 'root',
})
export class BeteiligteFormService {
  constructor(private readonly fb: FormBuilder) {}

  createForm(
    beteiligter: Beteiligter | undefined,
    minLength: number
  ): FormGroup {
    const formgroup = this.fb.group({
      persontyp: this.fb.control(
        beteiligter?.persontyp ?? PersonTyp.natuerlich
      ),
      rollen: this.fb.control(beteiligter?.rollen ?? []),
      natPerson: this.fb.group({
        vorname: this.fb.control(beteiligter?.natPerson?.vorname, [
          Validators.required,
          Validators.minLength(minLength),
        ]),
        nachname: this.fb.control(beteiligter?.natPerson?.nachname, [
          Validators.required,
          Validators.minLength(minLength),
        ]),
      }),
      jurPerson: this.fb.group({
        name1: this.fb.control(beteiligter?.jurPerson?.name1, [
          Validators.required,
          Validators.minLength(minLength),
        ]),
        name2: this.fb.control(beteiligter?.jurPerson?.name2),
      }),
      adressen: this.fb.array(this.createAdressArr(beteiligter?.adressen)),
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

  createAdressGroup(adress: Adresse | undefined): FormGroup {
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
