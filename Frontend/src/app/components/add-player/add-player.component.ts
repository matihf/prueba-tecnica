import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayersNames } from '../../interfaces/players-names.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css',
})
export class AddPlayerComponent {
  _form: FormGroup;
  @Output() emitNames = new EventEmitter<PlayersNames>();
  @Output() emitCancel = new EventEmitter();

  private _snackBar = inject(MatSnackBar);

  constructor(private _fb: FormBuilder) {
    this._form = this._fb.group({
      player1Name: ['', [Validators.required, Validators.maxLength(20)]],
      player2Name: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  public cancel(){
    this.emitCancel.emit();
  }

  public addPlayers() {
    if (this._form.value.player1Name === this._form.value.player2Name) {
      this._snackBar.open(
        'The two names must be diferent, please try again.','',
        {
          duration: 6000,
          verticalPosition: 'top',
        }
      );
    } else {
      const playersNames = {
        player1Name: this._form.value.player1Name,
        player2Name: this._form.value.player2Name,
      };
      this.emitNames.emit(playersNames);
    }
  }
}
