import { NullTemplateVisitor } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Beteiligter } from '../../models/beteiligter.model';

@Component({
  selector: 'app-beteiligte-list',
  templateUrl: './beteiligte-list.component.html',
  styleUrls: ['./beteiligte-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeteiligteListComponent implements OnInit {
  @Input() beteiligte: Beteiligter[] | null = [];

  editBeteiligter: Beteiligter | null = null;

  onBeteiligterEdit(beteiligter: Beteiligter): void {
    this.editBeteiligter = beteiligter;
  }

  onBeteiligterSaved(): void {
    this.editBeteiligter = null;
  }

  constructor() {}

  ngOnInit(): void {}
}
