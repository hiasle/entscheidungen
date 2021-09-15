import { NullTemplateVisitor } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Beteiligter } from '../../models/beteiligter.model';
import { BeteiligteService } from '../../services/beteiligte.service';

@Component({
  selector: 'app-beteiligte-list',
  templateUrl: './beteiligte-list.component.html',
  styleUrls: ['./beteiligte-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeteiligteListComponent implements OnInit {
  @Input() beteiligte: Beteiligter[] | null = [];
  
  constructor(private readonly bs: BeteiligteService) {}

  editBeteiligter$ = this.bs.editingBeteiligter$;

  onAddBeteiligter(): void {
    this.bs.addNewBeteiligter();
  }

  onBeteiligterEdit(beteiligter: Beteiligter): void {
    this.bs.onEditBeteiligter(beteiligter);
  }

  ngOnInit(): void {}
}
