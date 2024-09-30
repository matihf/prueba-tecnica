import { inject, Injectable, OnInit } from '@angular/core';
import { Move } from '../interfaces/move.interface';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  private myAppUrl: string = environments.endpoint;
  private myApiUrl: string = 'api/Move/';
  private http = inject(HttpClient);

  constructor() {}

  public getMoves(): Observable<Move[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.get<Move[]>(url);
  }

  public getMove(id: number): Observable<Move> {
    const url = `${ this.myAppUrl }${ this.myApiUrl }${ id }`;
    return this.http.get<Move>(url);
  }

  public deleteMove(id: number): Observable<boolean>{
    if (!id) throw Error('Move id si required');

    const url = `${ this.myAppUrl }${ this.myApiUrl }${ id }`;
    return this.http.delete<Move>(url)
    .pipe(
      map( resp => true),
      catchError( err => of (false) ),
    )
  }

  public updateMove(move: Move): Observable<boolean>{
    if (!move.id) throw Error('Move id si required');

    const url = `${ this.myAppUrl }${ this.myApiUrl }${ move.id }`;
    return this.http.put<Move>(url, move)
    .pipe(
      map( resp => true),
      catchError( err => of (false) ),
    )
  }

  public addMove(move: Move): Observable<boolean>{
    const url = `${ this.myAppUrl }${ this.myApiUrl }`;
    return this.http.post<Move>(url, move)
    .pipe(
      map( resp => true),
      catchError( err => of (false) ),
    )
  }
}
