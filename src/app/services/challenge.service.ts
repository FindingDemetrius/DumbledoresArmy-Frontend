import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Challenge } from './../model/Challenge';
import { environment } from './../../environments/environment';
import { SessionService } from './session.service';
import { ChallengeResponse } from '../model/ChallengeResponse';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';

const API_URL: string = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ChallengeService {

    constructor(private http: HttpClient,
        private session: SessionService,
        private auth: AuthService) { }

    getChallengeById(challengeId: String): Observable<Challenge> {
        if (!this.auth.isSignedIn()) {
            return throwError(new Error('The user is not signed in.'));
        }
        return this.http.get(API_URL + '/challenges/' + challengeId, this.getRequestOptions()).map(
            response => {
                console.log(response['result']);
                return new Challenge(response['result']);
            },
            error => {
                return error['error']['result']['Error'];
            }
        );
    }

    getListOfChallenges(limit: string, sortBy: string): Observable<Challenge[]> {
        if (!this.auth.isSignedIn()) {
            return throwError(new Error('The user is not signed in.'));
        }
        return this.http.get(API_URL + '/challenges/', this.getRequestOptions(this.getParameters(limit, sortBy))).map(
            response => {
                const listOfChallenges: Challenge[] = [];
                response['result'].foreach(challengeObject => listOfChallenges.push(new Challenge(challengeObject)));
                return listOfChallenges;
            },
            error => {
                return error['error']['result']['Error'];
            }
        );
    }

    createChallenge(challenge: Challenge): Observable<Challenge> {
        if (!this.auth.isSignedIn()) {
            return throwError(new Error('The user is not signed in.'));
        }
        const challengeInJson: object = JSON.parse(JSON.stringify(challenge, ['challengeName', 'tags', 'location', '_questions']));
        this.http.post(API_URL + '/challenges/', challengeInJson, this.getRequestOptions()).map(
            response => {
                return new Challenge(response['result']);
            },
            error => {
                return error['error']['result']['Error'];
            }
        );
    }

    editChalleneg(updateObject: Object, challengeId: String): Observable<Challenge> {
        if (!this.auth.isSignedIn()) {
            return throwError(new Error('The user is not signed in.'));
        }
        if (!this.IsUpdateUserObjectFieldsValid(updateObject)) {
            return throwError(new Error('One of the fields is not allowed to be updated. '));
        }
        this.http.patch(API_URL + '/challenges' + challengeId, this.getRequestOptions()).map(
            response => {
                return new Challenge(response['result']);
            },
            error => {
                return error['error']['result']['Error'];
            }
        );
    }

    deleteChallenge(challengeId: String): Observable<boolean> {
        if (!this.auth.isSignedIn()) {
            return throwError(new Error('The user is not signed in.'));
        }
        this.http.delete(API_URL + '/users/' + challengeId, this.getRequestOptions()).map(
            reponse => {
                return true;
            },
            error => {
                return error['error']['result']['Error'];
            }
        );
    }

    postChallengeResponse(challengeResponse: ChallengeResponse, challengeId: String): Observable<ChallengeResponse> {
        if (!this.auth.isSignedIn()) {
            return throwError(new Error('The user is not signed in.'));
        }
        const challengeResponseObject: object = JSON.parse(JSON.stringify(challengeResponse, ['numberOfQuestions', 'questionChoices']));
        this.http.post(API_URL + '/challenges/' + challengeId + '/response', challengeResponseObject, this.getRequestOptions()).map(
            response => {
                return new ChallengeResponse(response['result']);
            },
            error => {
                return error['error']['result']['Error'];
            }
        );
    }

    getChallengeResponse(challengeId: String) {
        if (!this.auth.isSignedIn()) {
            return throwError(new Error('The user is not signed in.'));
        }
        this.http.get(API_URL + '/challenges/' + challengeId + '/response', this.getRequestOptions()).map(
            response => {
                return new ChallengeResponse(response['result']);
            },
            error => {
                return error['error']['result']['Error'];
            }
        );

    // getGenresList(): Observable<string[]> {
    //     const url = `${this.baseUrl}/genres`
    //     return this.http.get<string[]>(url)
    //         .pipe(
    //             tap(genres => console.log('fetched genres')),
    //             catchError(this.handleError('getGenres', []))
    //         )

    // }

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
            if (!Challenge.FIELDS_ALLOWED_TO_UPDATE.includes(key)) { return false; }
        });
        return true;
    }
}
