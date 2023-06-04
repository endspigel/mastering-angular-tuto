import { Injectable } from '@angular/core';
import { Humain } from './humain';
import { EMPLOYES } from './mock-humains';
import { MessageService } from './message.service';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HumainService {

  private humainsUrl = 'api/humains';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHumains(): Observable<Humain[]> {
    return this.http.get<Humain[]>(this.humainsUrl)
      .pipe(
        tap(_ => this.log('fetched humains')),
        catchError(this.handleError<Humain[]>('getHumains', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHumainNo404<Data>(id: number): Observable<Humain> {
    const url = `${this.humainsUrl}/?id=${id}`;
    return this.http.get<Humain[]>(url)
      .pipe(
        map(humains => humains[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} humain id=${id}`);
        }),
        catchError(this.handleError<Humain>(`getHumain id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHumain(id: number): Observable<Humain> {
    const url = `${this.humainsUrl}/${id}`;
    return this.http.get<Humain>(url).pipe(
      tap(_ => this.log(`fetched humain id=${id}`)),
      catchError(this.handleError<Humain>(`getHumain id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHumains(term: string): Observable<Humain[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Humain[]>(`${this.humainsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found humains matching "${term}"`) :
         this.log(`no humains matching "${term}"`)),
      catchError(this.handleError<Humain[]>('searchHumains', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHumain(humain: Humain): Observable<Humain> {
    return this.http.post<Humain>(this.humainsUrl, humain, this.httpOptions).pipe(
      tap((newHumain: Humain) => this.log(`added humain w/ id=${newHumain.HumainId}`)),
      catchError(this.handleError<Humain>('addHumain'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHumain(id: number): Observable<Humain> {
    const url = `${this.humainsUrl}/${id}`;

    return this.http.delete<Humain>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted humain id=${id}`)),
      catchError(this.handleError<Humain>('deleteHumain'))
    );
  }

  /** PUT: update the hero on the server */
  updateHumain(humain: Humain): Observable<any> {
    return this.http.put(this.humainsUrl, humain, this.httpOptions).pipe(
      tap(_ => this.log(`updated humain id=${humain.HumainId}`)),
      catchError(this.handleError<any>('updateHumain'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HumainService: ${message}`);
  }
}