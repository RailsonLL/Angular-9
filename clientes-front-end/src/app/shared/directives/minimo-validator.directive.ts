import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[minimoValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinimoValidatorDirective,
    multi: true
  }]
})
export class MinimoValidatorDirective implements Validator {

  @Input("valorMinimo") valorMinimo: string = "0";

  constructor() { }

  validate(control: FormControl) {
      let v: number = +control.value;

      if (isNaN(v)) {
        return { 'minimo': true, 'requiredValue': 50 }
      }
      if (v < +this.valorMinimo) {
        return { 'minimo': true, 'requiredValue': 50 }
      }
      return null;
  }

}
