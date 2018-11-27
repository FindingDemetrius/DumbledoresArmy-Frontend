import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ComponentInteractionService } from '../services/componentInteraction.service';
import { SessionService } from '../services/session.service';

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

    constructor(private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private componentCommSerivce: ComponentInteractionService,
        private sessionService: SessionService,
        private userService: UserService) {
        this.frm = fb.group({
            emailAddress: ['', Validators.email],
            password: ['', Validators.required]
        });
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
                console.log(authToken);
<<<<<<< HEAD

=======
>>>>>>> profile
                this.authService.setAuthToken(String(authToken));
                // Get the user and set username for the session service.
                this.userService.getCurrentUser()
                    .subscribe(user => {
                        this.sessionService.username = user.username;
                        this.componentCommSerivce.toggleStateOfIsLoggedIn();
                    },
                        error => {
                            console.log(error);
                        });
            })
            .catch(error => {
                this.isBusy = false;
                this.hasFailed = true;
            });
    }
}
