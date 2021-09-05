import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntscheidungAddComponent } from './components/entscheidung-add/entscheidung-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntscheidungShowComponent } from './components/entscheidung-show/entscheidung-show.component';
import { EntscheidungListComponent } from './components/entscheidung-list/entscheidung-list.component';
import { EntscheidungContainerComponent } from './components/entscheidung-container/entscheidung-container.component';
import { EntscheidungEditComponent } from './components/entscheidung-edit/entscheidung-edit.component';
import { EntscheidungFormComponent } from './components/entscheidung-form/entscheidung-form.component';
import { EntscheidungContentDirective } from './components/entscheidung-content.directive';
import { AbbrechenFormComponent } from './components/abbrechen-form/abbrechen-form.component';
import { KanzleiauftragFormComponent } from './components/kanzleiauftrag-form/kanzleiauftrag-form.component';
import { KeineEntscheidungComponent } from './components/keine-entscheidung/keine-entscheidung.component';

@NgModule({
  declarations: [
    AppComponent,
    EntscheidungAddComponent,
    EntscheidungShowComponent,
    EntscheidungEditComponent,
    EntscheidungListComponent,
    EntscheidungContainerComponent,
    EntscheidungFormComponent,
    EntscheidungContentDirective,
    AbbrechenFormComponent,
    KanzleiauftragFormComponent,
    KeineEntscheidungComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
