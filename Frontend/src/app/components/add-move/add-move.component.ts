import { Component, inject } from '@angular/core';
import { MoveService } from '../../services/move.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Move } from '../../interfaces/move.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-move',
  templateUrl: './add-move.component.html',
  styleUrl: './add-move.component.css',
})
export class AddMoveComponent {
  loading: boolean = false;
  _form: FormGroup;

  private _moveservice = inject(MoveService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  constructor(private _fb: FormBuilder) {
    this._form = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  public addMove() {
    let move: Move = {
      name: this._form.value.name,
    };
    this._moveservice.addMove(move).subscribe((data) => {
      if (data === true) {
        this._router.navigate(['/listMoves']);
      } else {
        this._snackBar.open(
          'This rule generates a conflict with an exiting rule, please try another name.',
          '',
          {
            duration: 6000,
            verticalPosition: 'top',
          }
        );
      }
    });
  }
}
