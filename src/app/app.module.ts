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
import { ParentComponent } from './components/viewchild/parent/parent.component';
import { Child1Component } from './components/viewchild/child1/child1.component';
import { Child2Component } from './components/viewchild/child2/child2.component';
import { HeaderComponent } from './components/header/header.component';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import { EntscheidungenModule } from './modules/entscheidungen/entscheidungen.module';
import { DatenAendernModule } from './modules/daten-aendern/daten-aendern.module';

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
    ParentComponent,
    Child1Component,
    Child2Component,
    EntscheidungContentDirective,
    HeaderComponent,
    NavSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EntscheidungenModule,
    DatenAendernModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
