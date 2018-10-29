import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router, private http: HttpClient) {}

  private baseUrl = "https://geoquiz-1e874.appspot.com/api/"

  login(email, pass) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => this.router.navigate(["/"]))
      .catch(error => console.log(error));
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(["/"]))
      .catch(error => console.log(error));
  }

  register(email, pass): any {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, pass)
      .then(userCred => {
        var user = userCred.user;
        user.getIdToken(true).then(idToken => {
          console.log("IdToken", idToken);
          return this.http.post<object>(this.baseUrl + 'users', {
            headers: {
              "authorization": idToken,
              "Content-Type": 'application/json'
            },
            'userName': "Biswash",
            "name": "Biswash Adhikari",
            "dateOfBirth": "01/01/2000",
            "emailAddress": "biswash@google.com",
            "profileImageUrl": "sample-biswash.cdn.com"
          })
        })
        .catch(error => {
          return error;
        })
      });
  }

  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  get currentUser() {
    return this.authenticated ? this.afAuth.auth : null;
  }

  get currentUserId() {
    return this.authenticated ? this.afAuth.idToken : "";
  }
}
