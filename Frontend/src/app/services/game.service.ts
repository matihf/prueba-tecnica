import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private myAppUrl: string = environments.endpoint;
  private myApiUrl: string = 'api/Game/';
  private http = inject(HttpClient);

  constructor() {}

  public WhoWins(player1MoveId: number, player2MoveId: number): Observable<number> {
    const url = `${this.myAppUrl}${this.myApiUrl}WhoWins?player1MoveId=${player1MoveId}&player2MoveId=${player2MoveId}`;
    return this.http.get<number>(url);
  }
}
