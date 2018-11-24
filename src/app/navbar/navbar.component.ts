import { Component, DoCheck } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from "../services/session.service";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  navigateToProfilePage() {
    console.log('Going to profile page');
    this.router.navigate(['me']);
  }

  logOutCurrentUser() {
    console.log('Sign Out user.');
    this.authService.doSignOut();
  }
}
