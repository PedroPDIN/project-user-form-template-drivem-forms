import { NgModule } from "@angular/core";
import { StateDescriptionPipe } from './state-description.pipe';
import { IsFavoriteDescriptionPipe } from './is-favorite-description.pipe';
import { GenreDescriptionPipe } from './genre-description.pipe';

@NgModule({
  declarations: [
    StateDescriptionPipe,
    IsFavoriteDescriptionPipe,
    GenreDescriptionPipe,
  ],
  exports: [
    StateDescriptionPipe,
    IsFavoriteDescriptionPipe,
    GenreDescriptionPipe,
  ],
})
export class PipesModule {}
