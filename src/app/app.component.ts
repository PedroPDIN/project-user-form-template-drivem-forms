import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { GenresService } from './services/genres.service';
import { BrazilianStatesService } from './services/brazilian-states.service';
import { UsersListResponse } from './types/users-list-response';
import { GenresListResponse } from './types/genres-list-response';
import { StatesListResponse } from './types/states-response';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserBeforeAndAfterDialogComponent } from './components/user-before-and-after-dialog/user-before-and-after-dialog.component';

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
    private readonly _brazilianStatesService: BrazilianStatesService,
    private readonly _matDialog: MatDialog
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
      this.userSelected = structuredClone(userFound); // structuredClone() = método javascript que é responsável por clonar valores (objetos...).
    }
  }

  onFormSubmit() {
    if (this.userSelectedIndex === undefined) return;

    const originalUser = this.usersList[this.userSelectedIndex];

    this.openBeforeAndAfterDialog(
      originalUser,
      this.userSelected,
      this.userSelectedIndex
    );
  }

  openBeforeAndAfterDialog(
    originalUser: IUser,
    updatedUser: IUser,
    userSelectedIndex: number
  ) {
    // armazenando em uma varável para ter possuir a referencia do dailog, para observar (Observable) o dialog fechar e executar as alterações dos dados do usuário
    const dialogRef = this._matDialog.open(UserBeforeAndAfterDialogComponent, {
      data: {
        originalUser,
        updatedUser,
      },
      minWidth: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result)
      if (result) {
        this.confirmUserUpdate(updatedUser, userSelectedIndex);
      }
    });
  }

  confirmUserUpdate(updatedUser: IUser, userSelectedIndex: number) {
    this.usersList[userSelectedIndex] = structuredClone(updatedUser);

    console.group('Alteração finalizada - Lista de usuários atualizada:');
    console.log('Lista de usuário atual', this.usersList);
    console.groupEnd();
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
