import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GenresListResponse } from '../../types/genres-list-response';
import { StatesListResponse } from '../../types/states-response';
import { IUser } from '../../interfaces/user/user.interface';
import { getPasswordStrengthValue } from '../../utils/get-password-strength-value';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
})
export class UsersFormComponent implements OnChanges {
  passwordStrengthValue: number = 0;

  @Input({ required: true }) genresList: GenresListResponse = [];
  @Input({ required: true }) statesList: StatesListResponse = [];
  @Input({ required: true }) userSelected: IUser = {} as IUser;

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('onChanges', changes)
    const USER_CHANGED = changes['userSelected'];

    if (USER_CHANGED) {
      this.onPasswordChange(this.userSelected.password);
    };
  };

  onPasswordChange(password: string) {
    this.passwordStrengthValue = getPasswordStrengthValue(password);
  };
};
