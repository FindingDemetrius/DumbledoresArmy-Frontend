import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ComponentInteractionService } from '../services/componentInteraction.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private navBarService: ComponentInteractionService) {
  }

  navigateToProfilePage() {
    console.log('Going to profile page');
    this.router.navigate(['me']);
  }

  logOutCurrentUser() {
    console.log('Sign Out user.');
    this.authService.doSignOut();
  }

  onCreateNewChallenge() {
    console.log('Create challenge tapped');
    this.navBarService.toggleStateOfCreateChallengeComponent();
  }
}
