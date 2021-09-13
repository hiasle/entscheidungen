export interface Beteiligter {
  id?: number | string;
  persontyp: PersonTyp;
  natPerson?: NatuerlichePerson;
  jurPerson?: JuristischePerson;
  rollen: Rolle[];
  adressen?: Adresse[];
}

export interface NatuerlichePerson {
  vorname: string;
  nachname: string;
}

export interface JuristischePerson {
  name1: string;
  name2?: string;
}

export interface Adresse {
  id?: number;
  strasseNummer: string;
  postleitzahl: string;
  ort: string;
  land: string;
}

export enum Rolle {
  Beschuldigter = 'Beschuldigter',
  Opfer = 'Opfer',
  Zeuge = 'Zeuge',
  Verteidiger = 'Verteidiger',
  AnzeigendeBerichtendeStelle = 'Anzeigende Berichtende Stelle',
  Sonstiger = 'Sonstiger',
}

export enum PersonTyp {
  natuerlich = 'natuerlich',
  juristisch = 'juristisch',
}
