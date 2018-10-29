import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    login(email, pass) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, pass)
            .then(userCred => {
                console.log(userCred.user.getIdToken())
            })
            .catch(error => console.log(error))
    }

    logout() {
        this.afAuth.auth.signOut()
            .then(() => this.router.navigate(['/']))
            .catch(error => console.log(error))
    }

    get authenticated(): boolean {
        return this.afAuth.authState !== null
    }

    get currentUser() {
        return this.authenticated ? this.afAuth.auth : null
    }

    get currentUserId() {
        return this.authenticated ? this.afAuth.idToken : ''
    }
}