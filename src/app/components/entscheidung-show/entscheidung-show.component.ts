import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entscheidung } from 'src/app/shared/entscheidung.model';

@Component({
  selector: 'app-entscheidung-show',
  templateUrl: './entscheidung-show.component.html',
  styleUrls: ['./entscheidung-show.component.scss']
})
export class EntscheidungShowComponent implements OnInit {

  @Input()
  entscheidung: Entscheidung | undefined;

  @Output()
  toggleEdit = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.toggleEdit.emit();
  }

}
