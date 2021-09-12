import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeEntscheidungenComponent } from './welcome-entscheidungen/welcome-entscheidungen.component';

@NgModule({
  declarations: [WelcomeEntscheidungenComponent],
  imports: [CommonModule],
  exports: [WelcomeEntscheidungenComponent],
})
export class EntscheidungenModule {}
