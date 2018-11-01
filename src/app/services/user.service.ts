import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../model/User';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
    this.http.get(API_URL + '/users/' + username, this.getRequestOptions());
  }

  public createUser(user: User): Observable<User> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    return this.http.post(API_URL + '/users', user.getJsonUser(), this.getRequestOptions()).map(o => new User(o['result']));
  }

  public getListOfUsers(limit: string, sortBy: string): Observable<User[]> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    this.http.get(API_URL + '/users/', this.getRequestOptions());
  }

  public updateUser(username: string, updateObject: object): Observable<User> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    this.http.patch(API_URL + '/users/' + username, updateObject, this.getRequestOptions());
  }

  public deleteUser(username: string): Observable<boolean> {
    if (!this.auth.isSignedIn()) {
      return Observable.throw(new Error('The user is not signed in.'));
    }
    this.http.delete(API_URL + '/users/' + username, this.getRequestOptions());
  }

  private getRequestOptions(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.session.accessToken
      })
    };
  }
}

