import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ComponentInteractionService } from '../services/componentInteraction.service';
import { ChallengeService } from '../services/challenge.service';
import { Challenge } from '../model/Challenge';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  options: String[] = []
  challengeList: Challenge[]

  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private challengeService: ChallengeService,
    private navBarService: ComponentInteractionService) {
  }

  ngOnInit() {
    this.challengeService.getListOfChallenges()
      .subscribe(challenges => {
        challenges.forEach(challenge => {
          this.options.push(challenge.challengeName)
        })
      })
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
