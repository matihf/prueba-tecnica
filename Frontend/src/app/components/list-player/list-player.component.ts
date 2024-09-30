import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../interfaces/player.interface';

@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.component.html',
  styleUrl: './list-player.component.css'
})
export class ListPlayerComponent {

  public displayedColumns: string[] = ['name', 'victories'];
  dataSource: Player[] = [];
  public loading: boolean = false;

  private _snackBar = inject(MatSnackBar);
  private _playerservice = inject(PlayerService);

  ngOnInit(): void {
    this.getPlayers();
  }

  public getPlayers() {
    this.loading = true;
    this._playerservice.getPlayers().subscribe((data) => {
      this.loading = false;
      this.dataSource = data;
    });
  }

}
