import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Entscheidung } from 'src/app/shared/entscheidung.model';

@Component({
  selector: 'app-entscheidung-edit',
  templateUrl: './entscheidung-edit.component.html',
  styleUrls: ['./entscheidung-edit.component.scss']
})
export class EntscheidungEditComponent implements OnInit {

  @Input() entscheidung: Entscheidung | undefined;
  @Output() saved = new EventEmitter<Entscheidung>();

  constructor() { }

  onSave(entscheidung: Entscheidung) {
    this.saved.emit(entscheidung);
  }

  ngOnInit() {
  }

}
