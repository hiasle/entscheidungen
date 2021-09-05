import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appEntscheidungContent]'
})
export class EntscheidungContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
