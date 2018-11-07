import { Component, DoCheck } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { SessionService } from "../services/session.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  login = false;

  ngDoCheck() {
    this.login = this.authService.isSignedIn();
  }

  navigateToProfilePage() {
    console.log('Going to profile page');
  }

  logOutCurrentUser() {
    console.log('Sign Out user.');
    this.authService.doSignOut();
  }
}
