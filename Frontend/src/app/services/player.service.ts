import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { catchError, map, Observable, of } from 'rxjs';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private myAppUrl: string = environments.endpoint;
  private myApiUrl: string = 'api/Player/';
  private http = inject(HttpClient);

  constructor() { }

  public getPlayers(): Observable<Player[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.get<Player[]>(url);
  }

  public saveVictory(winner: string, loser: string): Observable<boolean>{
    const url = `${ this.myAppUrl }${ this.myApiUrl }`;
    let aa = {
      winner: winner,
      loser: loser,
    };

    return this.http.post<Player>(url, aa).pipe(
          map( resp => true),
          catchError( err => of (false) ),
        );
  }
}
