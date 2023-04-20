import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, concatAll, map, tap } from 'rxjs/operators';
import { Warehouse } from '../dto';
import { ConfigService } from './config.service';
import { MessageService } from './message.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private baseUrl!: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private configService: ConfigService,
    private oidcSecurityService: OidcSecurityService
  ) {
    this.baseUrl = `${configService.config.warehouseBaseUrl}/api/warehouses`;
  }

  private log(message: string) {
    this.messageService.add(`WarehouseService: ${message}`);
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

  get(): Observable<Warehouse[]> {
    const op = (accessToken: string) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      });

      return this.http.get<Warehouse[]>(this.baseUrl, { headers: headers })
        .pipe(
          tap(_ => this.log('fetched Warehouses')),
          catchError(this.handleError<Warehouse[]>('get Warehouses', []))
        );
    };

    return this.oidcSecurityService.getAccessToken()
      .pipe(
        map((val) => op(val)),
        concatAll()
      );
  }

  getById(id: string): Observable<Warehouse> {
    const op = (accessToken: string) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      });

      const url = `${this.baseUrl}/${id}`;
      return this.http.get<Warehouse>(url, { headers: headers }).pipe(
        tap(_ => this.log(`fetched Warehouse id=${id}`)),
        catchError(this.handleError<Warehouse>(`get Warehouse id=${id}`))
      );
    };

    return this.oidcSecurityService.getAccessToken()
      .pipe(
        map((val) => op(val)),
        concatAll()
      );
  }

  save(warehouse: Warehouse): Observable<Warehouse> {
    const op = (accessToken: string) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      });

      return this.http.post<Warehouse>(this.baseUrl, warehouse, { headers: headers }).pipe(
        tap((newWarehouse: Warehouse) => this.log(`added warehouse w/ id=${newWarehouse.id}`)),
        catchError(this.handleError<Warehouse>(`addWarehouse`))
      );
    };

    return this.oidcSecurityService.getAccessToken()
      .pipe(
        map((val) => op(val)),
        concatAll()
      );
  }

  delete(id: string): Observable<Warehouse> {
    const op = (accessToken: string) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
      });

      return this.http.delete<Warehouse>(this.baseUrl + '/' + id, { headers: headers }).pipe(
        tap(_ => this.log(`deleted warehouse id=${id}`)),
        catchError(this.handleError<Warehouse>('deleteWarehouse'))
      );
    };

    return this.oidcSecurityService.getAccessToken()
      .pipe(
        map((val) => op(val)),
        concatAll()
      );
  }

  update(warehouse: Warehouse): Observable<Warehouse> {
    const op = (accessToken: string) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      });

      return this.http.put<Warehouse>(this.baseUrl + '/' + warehouse.id, warehouse, { headers: headers }).pipe(
        tap((newWarehouse: Warehouse) => this.log(`updated warehouse w/ id=${newWarehouse.id}`)),
        catchError(this.handleError<Warehouse>(`updateWarehouse`))
      );
    };

    return this.oidcSecurityService.getAccessToken()
      .pipe(
        map((val) => op(val)),
        concatAll()
      );
  }
}
