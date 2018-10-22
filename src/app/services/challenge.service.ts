import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Challenge } from '../model/Challenge';
import { Genre } from '../model/Genre';
import { User } from '../model/User';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({ providedIn: 'root'})
export class ChallengeService {

    private baseUrl = "http://geoquiz-1e874.appspot.com/api/"

    constructor(private http: HttpClient) { }

    login(email, pass) {
        let info = { email, pass }
        const url = this.baseUrl + 'users'
        console.log('trying to login')
        this.http.post<string>(url, info)
            .pipe(
                tap(_ => console.log('logging in')),
                catchError(this.handleError('login', []))
            )
        
    }

    logout() {

    }

    getUser(username: string): Observable<User> {
        const url = `${this.baseUrl}/getUser/${username}`
        return this.http.get<User>(this.baseUrl+'getUser')
    }

    getAllChallenges(): Observable<Challenge[]> {
        return this.http.get<Challenge[]>(this.baseUrl+"getChallenges")
            .pipe(
                tap(challenges => console.log('fetched challenges')),
                catchError(this.handleError('getChallenges', []))
            );
    }

    getGenresList(): Observable<Genre[]> {
        return this.http.get<Genre[]>(this.baseUrl+"getGenres")
            .pipe(
                tap(genres => console.log('fetched genres')),
                catchError(this.handleError('getGenres', []))
            )
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
     
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
     
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}