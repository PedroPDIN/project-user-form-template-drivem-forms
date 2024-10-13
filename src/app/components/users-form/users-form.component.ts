import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GenresListResponse } from '../../types/genres-list-response';
import { StatesListResponse } from '../../types/states-response';
import { IUser } from '../../interfaces/user/user.interface';
import { getPasswordStrengthValue } from '../../utils/get-password-strength-value';
import { convertPtBrDateToObj } from '../../utils/convert-pt-br-date-to-obj';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { convertDateObjToPtBrDate } from '../../utils/convert-date-obj-to-pt-br-date';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
})
export class UsersFormComponent implements OnChanges, OnInit {
  passwordStrengthValue: number = 0;
  minDate: Date | null = null;
  maxDate: Date | null = null;
  dataValue: Date | null = null;
  displayedColumns: string[] = ['title', 'band', 'genre', 'favorite'];
  filteredGenresList: GenresListResponse = [];

  @Input({ required: true }) genresList: GenresListResponse = [];
  @Input({ required: true }) statesList: StatesListResponse = [];
  @Input({ required: true }) userSelected: IUser = {} as IUser;

  ngOnInit(): void {
    this.setMinAndMaxDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('onChanges', changes)
    const USER_CHANGED = changes['userSelected'];

    if (USER_CHANGED) {
      this.onPasswordChange(this.userSelected.password);
      this.setBirthDateToDatepicker(this.userSelected.birthDate);
      this.filteredGenresList = this.genresList; // quando houver uma troca de usuários, haverá um reset na lista de filtros.
    }
  }

  onPasswordChange(password: string) {
    this.passwordStrengthValue = getPasswordStrengthValue(password);
  }

  onDateChange(event: MatDatepickerInputEvent<any, any>) {
    if (!event.value) {
      return;
    }

    this.userSelected.birthDate = convertDateObjToPtBrDate(event.value);

    console.log(this.userSelected);
  }

  displayFn(genreId: number): string {
    const genreFound = this.genresList.find((genre) => genre.id === genreId);

    return genreFound ? genreFound.description : '';
  }

  filterGenres(text: string): void {
    if (typeof text === 'number') return;

    const searchTerm = text.toLowerCase();

    this.filteredGenresList = this.genresList.filter((genre) => {
      return genre.description.toLowerCase().includes(searchTerm);
    });
  }

  inAnyCheckboxChecked(): boolean {
    return this.userSelected.musics.some(music => music.isFavorite);
  }

  private setMinAndMaxDate() {
    this.minDate = new Date(new Date().getFullYear() - 100, 0, 1);
    this.maxDate = new Date();
  }

  private setBirthDateToDatepicker(birthDate: string) {
    this.dataValue = convertPtBrDateToObj(birthDate);
  }
};
