import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BeteiligteService } from '../services/beteiligte.service';

@Component({
  selector: 'app-welcome-daten-aendern',
  templateUrl: './welcome-daten-aendern.component.html',
  styleUrls: ['./welcome-daten-aendern.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeDatenAendernComponent implements OnInit {
  beteiligte$ = this.beteiligteService.beteiligte$;

  constructor(private readonly beteiligteService: BeteiligteService) {}

  ngOnInit(): void {}
}
