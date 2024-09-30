import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMoveComponent } from './components/list-move/list-move.component';
import { AddMoveComponent } from './components/add-move/add-move.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { EditMoveComponent } from './components/edit-move/edit-move.component';
import { ListPlayerComponent } from './components/list-player/list-player.component';

const routes: Routes = [
  { path: "addMove", component: AddMoveComponent },
  { path: "listMoves", component: ListMoveComponent },
  { path: "listPlayers", component: ListPlayerComponent },
  { path: "addGame", component: NewGameComponent },
  { path: "editMove/:id", component: EditMoveComponent },
  { path: '**', redirectTo: 'addGame', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
