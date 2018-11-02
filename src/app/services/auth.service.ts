import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

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
        if ((accessToken === null)) {
            return;
        }
        this.session.accessToken = accessToken;
    }

    public setUsername(username: string) {
        if (username === null) {
            return;
        }
        this.session.username = username;
    }
}
