import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private session: SessionService) { }

    public signUpWithFirebase(email: string, password: string): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(userCred => {
                    this.session.name = userCred.user.displayName;
                    return userCred.user.getIdToken();
                })
                .then(idToken => {
                    this.session.accessToken = idToken;
                    res(true);
                })
                .catch(error => {
                    rej(error);
                });
        });
    }

    private signInWithFirebaseAndGetToken(email: string, password: string) {
        return new Promise<boolean>((res, rej) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then(userCred => {
                    this.session.name = userCred.user.displayName;
                    return userCred.user.getIdToken();
                })
                .then(idToken => {
                    this.session.accessToken = idToken;
                    res(true);
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

    public doSignIn(accessToken: string, name: string) {
        /**
         * Setup the accessToken for the session.
         */
        if ((!accessToken) || (!name)) {
            return;
        }
        this.session.accessToken = accessToken;
        this.session.name = name;
    }
}
