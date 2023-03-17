import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Rack } from '../dto';
import { ConfigService } from './config.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RackService {
  private baseUrl!: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private configService: ConfigService
  ) { 
    this.baseUrl = `${configService.config.rackBaseUrl}/api/racks`;
  }

  private log(message: string) {
    this.messageService.add(`RackService: ${message}`);
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

  get(): Observable<Rack[]> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
    return this.http.get<Rack[]>(this.baseUrl, {headers: headers})
      .pipe(
        tap(_ => this.log('fetched Racks')),
        catchError(this.handleError<Rack[]>('get Racks', []))
      );
  }
  
  save(rack: Rack): Observable<Rack> {
    return this.http.post<Rack>(this.baseUrl, rack).pipe(
      tap((newRack: Rack) => this.log(`added rack w/ id=${newRack.id}`)),
      catchError(this.handleError<Rack>(`addRack`))
    );
  }

  delete(id: string): Observable<Rack> {
    return this.http.delete<Rack>(this.baseUrl + '/' + id).pipe(
      tap(_ => this.log(`deleted rack id=${id}`)),
      catchError(this.handleError<Rack>('deleteRack'))
    );
  }
}
