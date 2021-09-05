import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EntscheidungForm } from '../../shared/entscheidung-form';

@Component({
  selector: 'app-keine-entscheidung',
  templateUrl: './keine-entscheidung.component.html',
  styleUrls: ['./keine-entscheidung.component.scss']
})
export class KeineEntscheidungComponent extends EntscheidungForm<boolean, string> implements OnInit {

  ngOnInit() {
  }

  doSomething(): void {
    console.log('doSomething()->keineEntscheidung');
  }

  click() {
    this.submit.emit(true);
  }

}
