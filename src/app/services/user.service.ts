import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './../model/User';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Challenge } from '../model/Challenge';
import {throwError} from 'rxjs';

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
      return throwError(new Error('The user is not signed in.'));
    }
    return this.http.get<User>(API_URL + '/users/' + username, this.getRequestOptions()).map(
      response => {
        return new User(response['result']);
      },
      error => {
        return error['error']['result']['Error'];
      }
    );
  }

  public createUser(user: User): Observable<User> {
    if (!this.auth.isSignedIn()) {
      return throwError(new Error('The user is not signed in.'));
    }
    const userInJson: object = JSON.parse(JSON.stringify(user, ['username', 'name', 'profileImageUrl', 'dateOfBirth', 'emailAddress']));
    return this.http.post(API_URL + '/users', userInJson, this.getRequestOptions()).map(
      response => {
        return new User(response['result']);
      },
      error => {
        return error['error']['result']['Error'];
      }
    );
  }

  public getListOfUsers(limit?: string, sortBy?: string): Observable<User[]> {
    if (!this.auth.isSignedIn()) {
      return throwError(new Error('The user is not signed in.'));
    }
    return this.http.get(API_URL + '/users/', this.getRequestOptions(this.getParameters(limit, sortBy))).map(
      response => {
        const listOfUsers: User[] = [];
        response['result'].forEach(userObject => listOfUsers.push(new User(userObject)));
        return listOfUsers;
      },
      error => {
        return error['error']['result']['Error'];
      }
    );
  }

  public updateUser(username: string, updateObject: object): Observable<User> {
    if (!this.auth.isSignedIn())  {
      return throwError(new Error('The user is not signed in.'));
    }
    if (!this.IsUpdateUserObjectFieldsValid(updateObject)) {
      return throwError(new Error('One of the fields is not allowed to be updated. '));
    }
    this.http.patch(API_URL + '/users/' + username, updateObject, this.getRequestOptions()).map(
      response => {
        return new User(response['result']);
      },
      error => {
        return error['error']['result']['Error'];
      }
    );
  }

  public deleteUser(username: string): Observable<object> {
    if (!this.auth.isSignedIn()) {
      return throwError(new Error('The user is not signed in.'));
    }
    this.http.delete(API_URL + '/users/' + username, this.getRequestOptions()).map(
      reponse => {
        return true;
      },
      error => {
        return error['error']['result']['Error'];
      }
    );
  }

  public getChallengesPostedByUser(username: string, limit?: string, sortBy?: string): Observable<Challenge[]> {
    if (!this.auth.isSignedIn()) {
      return throwError(new Error('The user is not signed in.'));
    }
    this.http.get(API_URL + '/users/username/challengesPosted', this.getRequestOptions(this.getParameters(limit, sortBy))).map(
      response => {
        console.log(response);
        return new Challenge(response['result'])
        // const listOfChallenges: Challenge[] = [];
        // response['result'].forEach(challengeObject => listOfChallenges.push(new Challenge(challengeObject)));
        // return listOfChallenges;
      },
      error => {
        return error['error']['result']['Error'];
      }
    );
  }

  public getChallengesTakenByUser(username: string, limit?: string, sortBy?: string): Observable<Challenge[]> {
    if (!this.auth.isSignedIn()) {
      return throwError(new Error('The user is not signed in.'));
    }
    this.http.get(API_URL + '/users/username/challengesTakem', this.getRequestOptions(this.getParameters(limit, sortBy))).map(
      response => {
        const listOfChallenges: Challenge[] = [];
        response['result'].forEach(challengeObject => listOfChallenges.push(new Challenge(challengeObject)));
        return listOfChallenges;
      },
      error => {
        return error['error']['result']['Error'];
      }
    );
  }

  private getRequestOptions(params?: HttpParams): object {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.session.accessToken
      })
    };
    if (params !== null) {
      requestOptions['params'] = params;
    }
    return requestOptions;
  }

  private getParameters(limit: string, sortBy: string): HttpParams {
    const params = new HttpParams();
    if (limit !== null) { params.append('limit', limit); }
    if (sortBy !== null) { params.append('sortBy', sortBy); }
    return params;
  }

  private IsUpdateUserObjectFieldsValid(updateObject: object): boolean {
    // Check if the fields in the object are only within the allowed fields.
    Object.keys(updateObject).forEach(key => {
      if (!User.FIELDS_ALLOWED_TO_UPDATE.includes(key)) { return false; }
    });
    return true;
  }
}

