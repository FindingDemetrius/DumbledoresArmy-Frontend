import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Challenge } from './../model/Challenge';
import { environment } from './../../environments/environment';
import { SessionService } from './session.service';
import { ChallengeResponse } from '../model/ChallengeResponse';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL: string = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ChallengeService {

    constructor(private http: Http, private session: SessionService) { }

    getChallengeById(challengeId: String) {

    }

    getListOfChallenges(limit: String, sortBy: String) {

    }

    createChallenge(challenge: Challenge) {

    }

    editChalleneg(challenge: Challenge, challengeId: String) {

    }

    deleteChallenge(challengeId: String) {

    }

    postChallengeResponse(challengeResponse: ChallengeResponse, challengeId: String) {

    }

    getChallengeResponse(challengeId: String) {

    }

    private getRequestOptions(): object {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.session.accessToken
            })
        };
    }

    private getParameters(limit: string, sortBy: string): HttpParams {
        const params = new HttpParams();
        if (limit !== null) { params.append('limit', limit); }
        if (sortBy !== null) { params.append('sortBy', sortBy); }
        return params;
      }
}
