import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeEntscheidungenComponent } from './modules/entscheidungen/welcome-entscheidungen/welcome-entscheidungen.component';
import { WelcomeDatenAendernComponent } from './modules/daten-aendern/welcome-daten-aendern/welcome-daten-aendern.component';
import { WelcomeTemplatedrivenComponent } from './modules/templatedriven/welcome-templatedriven/welcome-templatedriven.component';

const routes: Routes = [
  { path: 'entscheidungen', component: WelcomeEntscheidungenComponent },
  { path: 'daten-aendern', component: WelcomeDatenAendernComponent },
  { path: 'templatedriven', component: WelcomeTemplatedrivenComponent },
  { path: '**', component: WelcomeEntscheidungenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
