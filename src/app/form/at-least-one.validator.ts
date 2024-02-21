import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function selectAtLeastOneValidator(): ValidatorFn {
  return ({ value }: AbstractControl): ValidationErrors | null => {
    return Object.keys(value).every((key) => !value[key])
      ? { selectNothing: true }
      : null;
  };
}
