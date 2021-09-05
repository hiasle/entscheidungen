import { Component, Input, OnInit } from '@angular/core';
import { Entscheidung } from 'src/app/shared/entscheidung.model';

@Component({
  selector: 'app-entscheidung-list',
  templateUrl: './entscheidung-list.component.html',
  styleUrls: ['./entscheidung-list.component.scss']
})
export class EntscheidungListComponent implements OnInit {

  @Input()
  entscheidungen: Entscheidung[] = [];

  constructor() { }

  ngOnInit() {
  }

}
