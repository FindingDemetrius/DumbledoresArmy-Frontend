import { Component, DoCheck } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { SessionService } from "../services/session.service";

@Component({
  selector: "nav-bar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements DoCheck {
  login: boolean = false;

  constructor(private authService: AuthService, private sessionService: SessionService,  private router: Router) {}

  ngDoCheck() {
    this.login = this.authService.isSignedIn();
    console.log(`${this.login}`);
  }

  getUserNameAndRouteToProfilePage(){
    console.log("Here");
      if (!this.authService.isSignedIn()){
          console.log("Registes");
          this.router.navigate(['register']);
          return
      }else{
        console.log("Not register");
        const username: String = this.sessionService.userName;
        this.router.navigate(['users/', username]);
      }
  }
}
