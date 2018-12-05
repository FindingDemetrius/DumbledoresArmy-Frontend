import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleSignInResponse } from './../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public frm: FormGroup;

  private subs: any;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;
  public serverResponse = false;
  public errorPlaceHolder: String;
  public isEmailFieldDisabled = false;
  public isNameFieldDisabled = false;
  public isGoogleButtonDisabled = false;
  private isSecondPartyAuth = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.frm = fb.group({
      emailAddress: ['', Validators.email],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public doSignIn() {

    // Make sure form values are valid
    if (this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const email = this.frm.get('emailAddress').value;
    const name = this.frm.get('name').value;
    const dateOfBirth = new Date(this.frm.get('dateOfBirth').value).toUTCString();
    const password = this.frm.get('password').value;
    const username = this.frm.get('username').value;

    const user = new User({
      'emailAddress': email,
      'username': username,
      'name': name,
      'dateOfBirth': dateOfBirth
    });
    if (this.isSecondPartyAuth) {
      this.userService.createUser(user)
        .subscribe((u: User) => {
          this.router.navigate(['home']);
        },
          errorMessage => {
            this.isBusy = false;
            this.serverResponse = true;
            this.errorPlaceHolder = errorMessage;
          });
    } else {
      this.auth
        .signUpWithFirebase(email, password)
        .then(authToken => {
          this.auth.setAuthToken(String(authToken));
          this.userService.createUser(user)
            .subscribe((u) => {
              console.log('Navigate');
              this.router.navigate(['home']);
            },
              errorMessage => {
                console.log(errorMessage);
                this.isBusy = false;
                this.serverResponse = true;
                this.errorPlaceHolder = errorMessage;
              });
        })
        .catch(error => {
          console.log(error);
          this.isBusy = false;
          this.serverResponse = true;
          this.errorPlaceHolder = error['message'];
        });
    }
  }

  public doSignInWithGoogle() {
    this.isGoogleButtonDisabled = true;
    this.isBusy = true;
    this.hasFailed = false;
    this.isSecondPartyAuth = true;
    this.auth.signUpWithFirebaseGooglePopup()
      .then((googleAuthData: GoogleSignInResponse) => {
        this.auth.setAuthToken(googleAuthData.idToken);
        this.isBusy = false;
        this.frm.get('emailAddress').setValue(googleAuthData.email);
        this.frm.get('name').setValue(googleAuthData.name);
        this.frm.controls['emailAddress'].disable();
        this.frm.controls['name'].disable();

        // TODO fill fields in form and set editiing to disabled.
      })
      .catch(error => {
        this.isGoogleButtonDisabled = false;
        this.hasFailed = true;
        this.isBusy = false;
      });
  }
}


