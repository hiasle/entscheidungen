import { Component, Input, OnInit } from '@angular/core';
import { Entscheidung } from '../../shared/entscheidung.model';
import { StoreService } from '../../shared/store.service';

@Component({
  selector: 'app-entscheidung-container',
  templateUrl: './entscheidung-container.component.html',
  styleUrls: ['./entscheidung-container.component.scss'],
})
export class EntscheidungContainerComponent implements OnInit {
  private editMode: boolean = false;

  @Input()
  entscheidung: Entscheidung | undefined;

  constructor(private readonly storeService: StoreService) {}

  ngOnInit() {}

  get isEdit(): boolean {
    return this.editMode;
  }

  onEdited(entscheidung: Entscheidung) {
    this.editMode = false;
  }

  public toggleEdit(): void {
    this.editMode = !this.editMode;
  }
}
