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

    public signUpWithFirebase(email: string, password: string): Promise<object> {
        console.log('2');
        return new Promise<object>((res, rej) => {
            console.log('1');
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(userCred => {
                    const emailAddress = userCred.user.email;
                    userCred.user.getIdToken(true)
                    .then(idToken => {
                        console.log(idToken);
                        res({
                            'email': emailAddress,
                            'accessToken': idToken
                        });
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

    public signInWithFirebaseAndGetToken(email: string, password: string) {
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
        if ((accessToken === null) || (name === null)) {
            return;
        }
        this.session.accessToken = accessToken;
        this.session.name = name;
    }

    public setUsername(username: string){
        this.session.userName = username;
    }
}
