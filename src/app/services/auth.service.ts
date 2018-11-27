import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private session: SessionService) { }

    public signUpWithFirebase(email: string, password: string): Promise<object> {
        return new Promise<object>((res, rej) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(userCred => {
                    res(userCred.user.getIdToken(true));
                })
                .catch(error => {
                    rej(error);
                });
        });
    }

    public signInWithFirebaseAndGetToken(email: string, password: string): Promise<object> {
        return new Promise<object>((res, rej) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then(userCred => {
                    res(userCred.user.getIdToken(true));
                })
                .catch(error => {
                    rej(error);
                });
        });
    }

    public signUpWithFirebaseGooglePopup(): Promise<GoogleSignInResponse> {
        return new Promise<GoogleSignInResponse>((res, rej) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(authResponse => {
                    console.log(authResponse);
                    authResponse.user.getIdToken(true)
                        .then(token => {
                            const response: GoogleSignInResponse = {
                                email: authResponse.user.email,
                                idToken: token,
                                name: authResponse.user.displayName
                            };
                            res(response);
                        })
                        .catch(error => {
                            rej(error);
                        });
                })
                .catch(error => {
                    rej(error);
                });
        });
    }

    public isSignedIn() {
        return !!this.session.accessToken;
    }

    public doSignOut() {
        /**
         * Destroy the session.
         */
        this.session.destroy();
    }

    public setAuthToken(accessToken: string) {
        /**
         * Setup the accessToken for the session.
         */
        console.log(accessToken);
        if ((accessToken === null)) {
            return;
        }
        console.log('Access token is not null');
        this.session.accessToken = accessToken;
    }
}

export interface GoogleSignInResponse {
    idToken: string;
    name: any;
    email: string;
}
