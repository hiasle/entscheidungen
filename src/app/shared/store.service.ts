import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Entscheidung, EntscheidungArt } from './entscheidung.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _entscheidungen = this.initialize();
  public data$ = new BehaviorSubject<Entscheidung[]>(this.initialize());

  constructor() {}

  get entscheidungen(): Observable<Entscheidung[]> {
    return of(this._entscheidungen);
  }

  addEntscheidung(entscheidung: Entscheidung) {
    this._entscheidungen = [...this._entscheidungen, entscheidung];
    this.data$.next(this._entscheidungen);
  }

  saveEntscheidung(entscheidung: Entscheidung) {
    this._entscheidungen = this._entscheidungen.map((e) => {
      return e.id === entscheidung.id ? { ...e, ...entscheidung } : e;
    });
    this.data$.next(this._entscheidungen);
  }

  private initialize(): Entscheidung[] {
    return [
      {
        id: uuid.v4(),
        art: EntscheidungArt.abbrechen,
        param1: 'param1',
        param2: true,
      },
      {
        id: uuid.v4(),
        art: EntscheidungArt.kanzleiauftrg,
        param1: 'kanzleiauftrag_param1',
        param2: true,
      },
    ];
  }
}
