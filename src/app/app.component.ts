import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { GenresService } from './services/genres.service';
import { BrazilianStatesService } from './services/brazilian-states.service';
import { UsersListResponse } from './types/users-list-response';
import { GenresListResponse } from './types/genres-list-response';
import { StatesListResponse } from './types/states-response';
import { IUser } from './interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;

  usersList: UsersListResponse = [];
  genresList: GenresListResponse = [];
  brazilianStates: StatesListResponse = [];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _genresService: GenresService,
    private readonly _brazilianStatesService: BrazilianStatesService
  ) {}
  ngOnInit(): void {
    this.getUsers();
    this.getGenres();
    this.getBrazilianStates();
  }

  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];

    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound); // structuredClone() = método javascript que é responsável por clonar valores.

      console.log(this.userSelectedIndex, this.userSelected);
    }
  }

  private getUsers() {
    this._usersService.getUsers().subscribe((usersListResponse) => {
      this.usersList = usersListResponse;
    });
  }

  private getGenres() {
    this._genresService.getGenres().subscribe((genresListResponse) => {
      this.genresList = genresListResponse;
    });
  }

  private getBrazilianStates() {
    this._brazilianStatesService
      .getBrazilianStates()
      .subscribe((brazilianStatesListResponse) => {
        this.brazilianStates = brazilianStatesListResponse;
      });
  }
}
