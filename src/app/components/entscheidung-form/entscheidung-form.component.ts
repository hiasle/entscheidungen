import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import {
  Entscheidung,
  EntscheidungArt,
} from 'src/app/shared/entscheidung.model';
import { StoreService } from '../../shared/store.service';
import { KeineEntscheidungComponent } from '../keine-entscheidung/keine-entscheidung.component';
import { AbbrechenFormComponent } from '../abbrechen-form/abbrechen-form.component';
import { KanzleiauftragFormComponent } from '../kanzleiauftrag-form/kanzleiauftrag-form.component';
import { EntscheidungContentDirective } from '../entscheidung-content.directive';
import { EntscheidungRegistrationService } from 'src/app/shared/entscheidung-registration.service';

@Component({
  selector: 'app-entscheidung-form',
  templateUrl: './entscheidung-form.component.html',
  styleUrls: ['./entscheidung-form.component.scss'],
})
export class EntscheidungFormComponent implements OnInit {
  private _entscheidung: Entscheidung | undefined = undefined;
  interval: number | undefined;

  @ViewChild(EntscheidungContentDirective, { static: true })
  adContent!: EntscheidungContentDirective;

  @ViewChild(EntscheidungContentDirective)
  adContent2!: EntscheidungContentDirective;

  @Input() set entscheidung(entscheidung: Entscheidung | undefined) {
    this._entscheidung = entscheidung;
    this.entscheidungForm = this.createForm(this._entscheidung);
  }

  @Output() onSave = new EventEmitter<Entscheidung>();

  childParameters: any = undefined;

  entscheidungForm: FormGroup = this.createForm(this._entscheidung);

  constructor(
    private readonly fb: FormBuilder,
    private readonly storeService: StoreService,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly entscheidunRegistrationService: EntscheidungRegistrationService
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  public onSubmit() {
    this.storeService.saveEntscheidung({
      ...this._entscheidung,
      ...this.entscheidungForm.value,
    });
    this.onSave.emit(this.entscheidungForm.value);
  }

  changeArt(e: any) {
    console.log(e.value);
    this.entscheidungForm.controls.art.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  loadComponent() {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        this.entscheidunRegistrationService.retrieveComponentForEntscheidung(
          this._entscheidung?.art
        )
      );

    const viewContainerRef = this.adContent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef =
      viewContainerRef.createComponent<any>(componentFactory);
    componentRef.instance.input = 'Eingegeben und geändert';
    componentRef.instance.submit.subscribe((flag: any) => {
      this.childParameters = flag;
      console.log('Click event with value: ', flag);
    });
  }

  private createForm(entscheidung: Entscheidung | undefined): FormGroup {
    return this.fb.group({
      art: this.fb.control([entscheidung?.art ?? 0]),
      param1: this.fb.control([entscheidung?.param1 ?? '']),
      param2: this.fb.control([entscheidung?.param2 ?? false]),
    });
  }
}
