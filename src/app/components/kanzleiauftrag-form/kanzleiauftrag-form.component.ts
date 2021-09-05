import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { EntscheidungForm } from '../../shared/entscheidung-form';

@Component({
  selector: 'app-kanzleiauftrag-form',
  templateUrl: './kanzleiauftrag-form.component.html',
  styleUrls: ['./kanzleiauftrag-form.component.scss'],
})
export class KanzleiauftragFormComponent
  extends EntscheidungForm<{ label: string; value: string }, string>
  implements OnInit
{
  ngOnInit() {}

  doSomething(): void {
    console.log('doSomething()->kanzleiauftrag');
  }

  click(): void {
    this.submit.emit({ label: 'label', value: 'value'});
  }
}
