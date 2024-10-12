import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordConfirmationValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordConfirmationValidatorDirective,
      multi: true,
    }
  ]
})
export class PasswordConfirmationValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value.confirmacaoSenha) return null;

    const passwordConfirmationControl = control.get('confirmacaoSenha'); // Salvando/armazenando o control do elemento input.

    if (control.value.senha !== control.value.confirmacaoSenha) {
      // passado também o erro personalizado para o control do Input, com isso, além de ser acessado apenas pelo o control do formulário "ngForm".
      // ele também passar a ser acessado pelo o control do elemento input "ngModel" (também util para outros elementos).
      passwordConfirmationControl?.setErrors({
        invalidPasswordConfirmation: true,
      });

      return { invalidPasswordConfirmation: true };
    }

    return null;
  }
}
