import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-login-button',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public frm: FormGroup;

    public isBusy = false;
    public hasFailed = false;
    public showInputErrors = false;

<<<<<<< HEAD
    onSubmit(email, pass) {
        //console.log('Submit button clicked email: ' + email + ' password: ' + pass)
        this.authService.signInWithFirebaseAndGetToken(email, pass)
            .then(res => this.authService.setAuthToken(String(res)))
            .then(() => this.router.navigate(['/']));
=======
    constructor(private authService: AuthService,
        private fb: FormBuilder,
        private router: Router) {
        this.frm = fb.group({
            emailAddress: ['', Validators.email],
            password: ['', Validators.required]
        });
>>>>>>> Aayush-addServices
    }

    ngOnInit() {
    }

    public doSignIn() {

        if (this.frm.invalid) {
            this.showInputErrors = true;
        }

        this.isBusy = true;
        this.hasFailed = false;

        const emailAddress = this.frm.get('emailAddress').value;
        const password = this.frm.get('password').value;

        this.authService.signInWithFirebaseAndGetToken(emailAddress, password)
            .then(authToken => {
                this.authService.setAuthToken(String(authToken));
            })
            .catch(error => {
                this.isBusy = false;
                this.hasFailed = true;
            });
    }
}
