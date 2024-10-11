import { NgModule } from "@angular/core";
import { EmailPatternValidatorDirective } from './email-pattern-validator.directive';
import { CredentialsValidatorDirective } from './credentials-validator.directive';
import { PasswordStrengthValidatorDirective } from './password-strength-validator.directive';

@NgModule({
  declarations: [
    EmailPatternValidatorDirective,
    CredentialsValidatorDirective,
    PasswordStrengthValidatorDirective,
  ],
  exports: [
    EmailPatternValidatorDirective,
    CredentialsValidatorDirective,
    PasswordStrengthValidatorDirective,
  ],
})
export class DirectivesModule {}
