import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ChallengeService } from '../services/challenge.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
    }
}

@Component({
    selector: 'login-button',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})

export class LoginComponent {
    emailFormControl = new FormControl('', [ Validators.required, Validators.email ])
    matcher = new MyErrorStateMatcher()
    hide = true

    constructor(private challengeService: ChallengeService) { }

    onSubmit(email, pass) {
        //console.log('Submit button clicked email: ' + email + ' password: ' + pass)
        this.challengeService.login(email, pass)
    }
}