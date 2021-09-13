import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {
  faChevronDown,
  faChevronRight,
  faCoffee,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Beteiligter, PersonTyp } from '../../models/beteiligter.model';
import { extractName } from '../../utils/beteiligte-utils';

@Component({
  selector: 'app-beteiligter-read',
  templateUrl: './beteiligter-read.component.html',
  styleUrls: ['./beteiligter-read.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeteiligterReadComponent implements OnInit {
  @Input() beteiligter: Beteiligter | undefined = undefined;
  @Output() editBeteiligter = new EventEmitter<Beteiligter>();

  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faPencilAlt = faPencilAlt;
  toggle: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onToggle(): void {
    this.toggle = !this.toggle;
  }

  onEditBeteiligter(): void {
    this.editBeteiligter.emit(this.beteiligter);
  }

  get name(): string {
    return extractName(this.beteiligter);
  }

  hasRollen(): boolean {
    return (
      this.beteiligter?.rollen != null && this.beteiligter.rollen.length > 0
    );
  }

  get rollen(): string {
    if (this.beteiligter?.rollen == null) {
      return '';
    }
    return this.beteiligter?.rollen.join(', ');
  }
}
