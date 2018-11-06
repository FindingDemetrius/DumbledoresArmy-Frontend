import { Component, DoCheck } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { SessionService } from "../services/session.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "nav-bar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements DoCheck {
  login: boolean = false;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngDoCheck() {
    this.login = this.authService.isSignedIn();
  }

  getUserNameAndRouteToProfilePage() {
    if (!this.authService.isSignedIn()) {
      this.router.navigate(["register"]);
      return;
    } else {
      const username: String = this.sessionService.username;
      this.router.navigate(["/profile", username]);
    }
  }
}
