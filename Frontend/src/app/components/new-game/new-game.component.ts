import { PlayerRound } from '../../interfaces/player-round.interface';
import { PlayersNames } from '../../interfaces/players-names.interface';
import { Score } from '../../interfaces/score.interface';
import { GameService } from '../../services/game.service';
import { Player } from './../../interfaces/player.interface';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {

  player1 : Player = {
    name: "alvaro",
    wins: 0,
  };
  player2: Player = {
    name: "mati",
    wins: 0,
  };
  player1Round?: PlayerRound;
  score: Score[] = [];

  round: number = 1;
  state: number = 0;
  winnerName: string = "";

  private _snackBar = inject(MatSnackBar);
  private _gameservice = inject(GameService);
  private _playerservice = inject(PlayerService);

/**
 * 0 => star and result
 * 1 => player
 * 2 => rounds
 */

  public newGame(){
    this.state = 1;
    this.winnerName = ""
    this.player1Round = undefined;
    this.round = 1;
    this.score = [];
  }

  public savePlayersNames(playersNames: PlayersNames){
    this.player1.name = playersNames.player1Name;
    this.player2.name = playersNames.player2Name;
    this.state = 2;
  }

  public cancel(){
    this.state = 0;
    this.player1Round = undefined;
  }

  public savePlayerMove(moveId: number){
    if (this.player1Round === undefined)
    {
      const playerRound : PlayerRound= {
        move: moveId,
        playerName: this.player1.name
      };
      this.player1Round = playerRound;
    }
    else
    {
      //calcular resultado ronda
      this._gameservice.WhoWins(this.player1Round!.move, moveId).subscribe(
        data => {
          if (data == 2){//2 wins

            this._snackBar.open(`${this.player2.name} wins round ${this.round}.`, '', {
              duration: 4000,
              verticalPosition: 'top',
            });

            this.player2.wins = this.player2.wins + 1;
            if (this.player2.wins === 3){
              this.winnerName = this.player2.name;
              this.state = 0;
              this._playerservice.saveVictory(this.winnerName, this.player1.name).subscribe();
            }else{
              this.player1Round = undefined;
              this.score.push({
                player: this.player2.name,
                round: this.round
              });
              this.round = this.round + 1;
            }
          }else if (data == 1){//1 wins

            this._snackBar.open(`${this.player1.name} wins round ${this.round}.`, '', {
              duration: 4000,
              verticalPosition: 'top',
            });

            this.player1.wins = this.player1.wins + 1;
            if (this.player1.wins === 3){
              this.winnerName = this.player1.name;
              this.state = 0;
              this._playerservice.saveVictory(this.winnerName, this.player2.name).subscribe();

            }else{
              this.player1Round = undefined;
              this.score.push({
                player: this.player1.name,
                round: this.round
              });
              this.round = this.round + 1;
            }
          }else{

            this._snackBar.open(`Round ${this.round} was a draw.`, '', {
              duration: 4000,
              verticalPosition: 'top',
            });

            this.player1Round = undefined;
            this.score.push({
              player: "draw",
              round: this.round
            });
            this.round = this.round + 1;
          }
        }
      );

    }
  }
}
