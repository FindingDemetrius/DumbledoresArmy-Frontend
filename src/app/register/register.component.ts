import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './../services/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private api: ApiServiceService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      username: ['', Validators.required]
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
    // this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const email = this.frm.get('email').value;
    const password = this.frm.get('password').value;
    const dateOfBirth = this.frm.get('dateOfBirth').value;

    // Submit request to API
    this.api
      .register(email, password)
      .subscribe(
        (response) => {
          // this.auth.doSignIn(
          //   response.token,
          //   response.name
          // );
          this.router.navigate(['home']);
        },
        (error) => {
          this.isBusy = false;
          this.hasFailed = true;
        }
      );
  }

}
