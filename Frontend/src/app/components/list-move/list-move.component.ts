import { Component, inject, OnInit } from '@angular/core';
import { Move } from '../../interfaces/move.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoveService } from '../../services/move.service';

@Component({
  selector: 'app-list-move',
  templateUrl: './list-move.component.html',
  styleUrl: './list-move.component.css',
})
export class ListMoveComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'defeatId', 'action'];
  dataSource: Move[] = [];
  public loading: boolean = false;

  private _snackBar = inject(MatSnackBar);
  private _moveservice = inject(MoveService);

  ngOnInit(): void {
    this.getMoves();
  }

  public getMoves() {
    this.loading = true;
    this._moveservice.getMoves().subscribe((data) => {
      this.loading = false;
      this.dataSource = data;
    });
  }

  public move(moveId: number): Move | undefined {
    return this.dataSource.find(m => m.id == moveId);
  }

  public numberOfMovements(): number {
    return this.dataSource.length;
  }

  public deleteMove(id: number) {
    this.loading = true;
    this._moveservice.deleteMove(id).subscribe(() => {
      this._snackBar.open('The move was eliminated successfully ' + id, '', {
        duration: 6000,
        verticalPosition: 'top',
      });
      this.loading = false;
      this.getMoves();
    });
  }
}
