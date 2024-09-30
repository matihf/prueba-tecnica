import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoveService } from '../../services/move.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Move } from '../../interfaces/move.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-move',
  templateUrl: './edit-move.component.html',
  styleUrl: './edit-move.component.css',
})
export class EditMoveComponent implements OnInit {
  private _moveservice = inject(MoveService);
  private _router = inject(Router);
  private id: number;
  protected move?: Move;
  public moves: Move[] = [];
  private _snackBar = inject(MatSnackBar);

  loading: boolean = false;
  _form: FormGroup;

  constructor(private _fb: FormBuilder, private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

    this._moveservice.getMove(this.id).subscribe((data) => {
      this.move = data;
    });

    this._form = this._fb.group({
      move: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getMoves();
  }

  public getMoves() {
    this.loading = true;
    this._moveservice.getMoves().subscribe((data) => {
      this.loading = false;
      this.moves = data.filter(m => m.id != this.id);
    });
  }

  public setRule() {
    let move: Move = {
      name: this.move!.name,
      id: this.id,
      defeatId: this._form.value.move
    };
    this._moveservice.updateMove(move).subscribe((data) => {
      if (data === true)
      {
        this._router.navigate(['/listMoves']);
      }
      else
      {
        this._snackBar.open('This rule generates a conflict with an exiting rule, please try again.', '', {
          duration: 6000,
          verticalPosition: 'top',
        });
      }
    })
  }
}
