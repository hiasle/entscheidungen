import { Injectable } from '@angular/core';
import { Beteiligter, PersonTyp, Rolle } from '../models/beteiligter.model';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BeteiligteService {
  private beteiligte = this.initialize();
  public beteiligte$ = new BehaviorSubject<Beteiligter[]>(this.beteiligte);

  constructor() {}

  public saveBeteiligter(beteiligter: Beteiligter): void {
    this.beteiligte = this.beteiligte.map(b => b.id === beteiligter.id ? beteiligter : b);
    this.beteiligte$.next(this.beteiligte);
  }

  public addNewBeteiligter(): void {
    this.beteiligte = [...this.beteiligte, {
      id: uuidv4(),
      persontyp: PersonTyp.natuerlich,
      rollen: [Rolle.Sonstiger],
    }];
    this.beteiligte$.next(this.beteiligte);
  }

  private initialize(): Beteiligter[] {
    return [
      {
        id: 1,
        persontyp: PersonTyp.natuerlich,
        natPerson: {
          vorname: 'Otto',
          nachname: 'Opfer',
        },
        rollen: [Rolle.Opfer],
        adressen: [
          {
            strasseNummer: 'Opferstrasse 1',
            postleitzahl: '1030',
            ort: 'Wien',
            land: 'Österreich',
          },
        ],
      },
      {
        id: 2,
        persontyp: PersonTyp.natuerlich,
        natPerson: {
          vorname: 'Zora',
          nachname: 'Zeugin',
        },
        rollen: [Rolle.Zeuge],
        adressen: [
          {
            strasseNummer: 'Zeugenstrasse 1',
            postleitzahl: '1010',
            ort: 'Wien',
            land: 'Österreich',
          },
        ],
      },
      {
        id: 3,
        persontyp: PersonTyp.juristisch,
        jurPerson: {
          name1: 'Polizeidienststelle Ottakring',
        },
        rollen: [Rolle.AnzeigendeBerichtendeStelle],
        adressen: [
          {
            strasseNummer: 'Polizeiplatz 1',
            postleitzahl: '1160',
            ort: 'Wien',
            land: 'Österreich',
          },
        ],
      },
      {
        id: 4,
        persontyp: PersonTyp.natuerlich,
        natPerson: {
          vorname: 'Max',
          nachname: 'Mustermann',
        },
        rollen: [Rolle.Opfer, Rolle.Zeuge],
        adressen: [
          {
            strasseNummer: 'Musterstrasse 1',
            postleitzahl: '1050',
            ort: 'Wien',
            land: 'Österreich',
          },
        ],
      },
    ];
  }
}
