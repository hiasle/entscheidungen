import { Beteiligter, PersonTyp } from './../models/beteiligter.model';
import { NatuerlichePerson } from '../models/beteiligter.model';
import { FormBuilder, FormGroup } from '@angular/forms';

export function extractName(
  beteiligter: Beteiligter | undefined | null
): string {
  switch (beteiligter?.persontyp) {
    case PersonTyp.juristisch:
      return beteiligter?.jurPerson != null
        ? beteiligter.jurPerson.name1 +
            ' ' +
            (beteiligter?.jurPerson?.name2 ?? '')
        : '';
    case PersonTyp.natuerlich:
      return beteiligter.natPerson != null
        ? beteiligter.natPerson.vorname + ' ' + beteiligter.natPerson.nachname
        : '';
    default:
      return 'no name';
  }
}

export function mergeBeteiligter(
  beteiligter: Beteiligter,
  formValue: Partial<Beteiligter>
): Beteiligter {
  return {
    ...beteiligter,
    ...(formValue?.persontyp != null && { persontyp: formValue.persontyp }),
    ...(formValue?.persontyp == PersonTyp.natuerlich
      ? {
          natPerson: formValue.natPerson,
        }
      : { natPerson: undefined }),
    ...(formValue?.persontyp == PersonTyp.juristisch
      ? {
          jurPerson: formValue.jurPerson,
        }
      : { jurPerson: undefined }),
    ...(formValue.rollen != null &&
      formValue.rollen.length > 0 && { rollen: formValue.rollen }),
    ...(formValue.adressen != null &&
      formValue.adressen.length > 0 && { adressen: formValue.adressen }),
  };
}
