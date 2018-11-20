import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../services/challenge.service';

import { User } from '../model/User';
import { Challenge } from '../model/Challenge';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChallengeResponse } from '../model/ChallengeResponse';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User = new User();
  listOfChallengesPosted$: Observable<Challenge[]>;
  listOfChallengesTaken$: Observable<ChallengeResponse[]>;

  sub: any;
  username = '';

  constructor(private authService: AuthService,
    private route: ActivatedRoute, private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['']);
    }
    this.getUserProfile();
  }

  getUserProfile() {
    // Check if username specified in the URL
    const username = this.route.snapshot.paramMap.get('username');
    if (username === null) {
      this.userService.getCurrentUser()
        .subscribe(user => {
          this.user = user;
          this.listOfChallengesPosted$ = this.userService.getChallengesPostedByUser(this.user.username, '10');
          this.listOfChallengesTaken$ = this.userService.getChallengesTakenByUser(this.user.username, '10');
        });
    } else {
      this.userService.getUser(username)
        .subscribe(user => this.user = user);
    }
  }
}
