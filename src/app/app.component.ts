import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from './shared/store.service';
import { Observable, Subject } from 'rxjs';
import { Entscheidung, EntscheidungArt } from './shared/entscheidung.model';
import * as uuid from 'uuid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly refresh$ = new Subject<void>();
  entscheidungen$: Observable<Entscheidung[]> | undefined;
  myContext = {$implicit: 'World', localSk: 'Svet'};

  title = 'entscheidungen';

  constructor(
    private readonly storeService: StoreService,
  ) {
    this.entscheidungen$ = this.storeService.data$.asObservable();
  }

  addEntscheidung() {
    this.storeService.addEntscheidung({
      id: uuid.v4(),
      art: EntscheidungArt.keine,
      param1: '',
      param2: false,
    });
    this.refresh$.next();
  }
}
