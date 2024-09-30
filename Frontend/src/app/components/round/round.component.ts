import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoveService } from '../../services/move.service';
import { Player } from '../../interfaces/player.interface';
import { Move } from '../../interfaces/move.interface';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrl: './round.component.css'
})
export class RoundComponent implements OnInit{

  _form: FormGroup;
  private _moveservice = inject(MoveService);

  moves: Move[] = [];
  public loading: boolean = false;

  @Input() player!: Player;
  @Input() round!: number;
  @Output() emitMove = new EventEmitter<number>();
  @Output() emitCancel = new EventEmitter();

  constructor(private _fb: FormBuilder){
    this._form = this._fb.group({
      move: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getMoves();
  }

  public cancel(){
    this.emitCancel.emit();
  }

  public getMoves() {
    this.loading = true;
    this._moveservice.getMoves().subscribe((data) => {
      this.loading = false;
      this.moves = data;
    });
  }

  playerMove(){
    this.emitMove.emit(this._form.value.move);
  }

}
