import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public frm: FormGroup;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;
  public serverResponse = false;
  public errorPlaceHolder: String;

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
      'userName': username,
      'name': name,
      'dateOfBirth': dateOfBirth
    });
    // Submit request to API
    this.auth
      .signUpWithFirebase(email, password)
      .then(response => {
        this.auth.doSignIn(response['accessToken'], response['name']);
        // Send POST req to backend to create a user.
        this.userService.createUser(user)
          .subscribe((u: User) => {
            this.router.navigate(['home']);
          },
            error => {
              this.isBusy = false;
              this.serverResponse = true;
              this.errorPlaceHolder = error['error']['result']['Error'];
            });
      })
      .catch(error => {
        this.isBusy = false;
        this.serverResponse = true;
        this.errorPlaceHolder = error['message'];
      });
  }
}

