import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMoveComponent } from './components/add-move/add-move.component';
import { ListMoveComponent } from './components/list-move/list-move.component';
import { EditMoveComponent } from './components/edit-move/edit-move.component';
import { RoundComponent } from './components/round/round.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { ListPlayerComponent } from './components/list-player/list-player.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NewGameComponent } from './components/new-game/new-game.component';
import { SharedModule } from './shared/shared.module';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMoveComponent,
    ListMoveComponent,
    EditMoveComponent,
    RoundComponent,
    AddPlayerComponent,
    ListPlayerComponent,
    NewGameComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
