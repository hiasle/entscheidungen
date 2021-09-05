import { Injectable } from '@angular/core';
import { EntscheidungArt } from './entscheidung.model';
import { AbbrechenFormComponent } from '../components/abbrechen-form/abbrechen-form.component';
import { KanzleiauftragFormComponent } from '../components/kanzleiauftrag-form/kanzleiauftrag-form.component';
import { KeineEntscheidungComponent } from '../components/keine-entscheidung/keine-entscheidung.component';

@Injectable({
  providedIn: 'root',
})
export class EntscheidungRegistrationService {
  constructor() {}

  retrieveComponentForEntscheidung(art: EntscheidungArt | undefined): any {
    if (art != null) {
      switch (art) {
        case EntscheidungArt.abbrechen:
          return AbbrechenFormComponent;
        case EntscheidungArt.kanzleiauftrg:
          return KanzleiauftragFormComponent;
        default:
          return KeineEntscheidungComponent;
      }
    }
    return KeineEntscheidungComponent;
  }
}
