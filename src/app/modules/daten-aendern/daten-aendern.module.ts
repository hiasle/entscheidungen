import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeDatenAendernComponent } from './welcome-daten-aendern/welcome-daten-aendern.component';
import { BeteiligteListComponent } from './components/beteiligte-list/beteiligte-list.component';
import { BeteiligterReadComponent } from './components/beteiligter-read/beteiligter-read.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BeteiligterEditComponent } from './components/beteiligter-edit/beteiligter-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdressControlComponent } from './components/utils/adress-control/adress-control.component';

@NgModule({
  declarations: [
    WelcomeDatenAendernComponent,
    BeteiligteListComponent,
    BeteiligterReadComponent,
    BeteiligterEditComponent,
    AdressControlComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, NgSelectModule],
  exports: [WelcomeDatenAendernComponent],
})
export class DatenAendernModule {}
