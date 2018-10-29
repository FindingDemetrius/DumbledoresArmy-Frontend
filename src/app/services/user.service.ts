import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './../model/User';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private session: SessionService,
    private http: HttpClient,
    private auth: AuthService) { }

  public getUser(username: string): Observable<User> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    const options = this.getRequestOptions();
    this.http.get(API_URL + '/users/' + username, options)
      .pipe(
        map(response => {
          return new User(response);
        })
        , catchError((err, caught) => {
          return Observable.throw(err);
        })
      );
  }

  public createUser(user: User): Observable<User> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    const options = this.getRequestOptions();
    this.http.post<User>(API_URL + '/users', user.getJsonUser(), options)
      .pipe(
        map(response => {
          return new User(response);
        })
        , catchError((err, caught) => {
          return Observable.throw(err);
        })
      );
  }

  public getListOfUsers(limit: string, sortBy: string): Observable<User[]> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    const options = this.getRequestOptions();
    this.http.get(API_URL + '/users/', options)
      .pipe(
        map(response => {
          const users: object[] = response['result'];
          return users.map(user => new User(user));
        })
        , catchError((err, caught) => {
          return Observable.throw(err);
        })
      );
  }

  public updateUser(username: string, updateObject: object): Observable<User> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    const options = this.getRequestOptions();
    this.http.patch(API_URL + '/users/' + username, updateObject, options)
      .pipe(
        map(response => {
          return new User(response);
        })
        , catchError((err, caught) => {
          return Observable.throw(err);
        })
      );
  }

  public deleteUser(username: string): Observable<boolean> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    const options = this.getRequestOptions();
    this.http.delete(API_URL + '/users/' + username, options)
      .pipe(
        map(response => {
          return true;
        })
        , catchError((err, caught) => {
          return Observable.throw(err);
        })
      );
  }

  private getRequestOptions(): object {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.session.accessToken,
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
