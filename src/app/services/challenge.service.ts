import { HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Challenge } from './../model/Challenge';
import { User } from './../model/User';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL: string = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ChallengeService {

    constructor(private http: Http) { }

    getChallenge(challengeId: string) {
    }

    getUser(username: string) {
    }

    getAllChallenges() {
    }

    getGenresList() {
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
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
