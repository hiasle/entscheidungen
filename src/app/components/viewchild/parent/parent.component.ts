import { Component, OnInit, ViewChild } from '@angular/core';
import { EntscheidungDirective } from '../entscheidung.directive';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  @ViewChild(EntscheidungDirective)
  set child(e: EntscheidungDirective) {
    console.log('Entscheidung Child: ', e);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
