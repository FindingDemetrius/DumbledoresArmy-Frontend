import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../services/challenge.service';

import { User } from '../model/User';
import { Challenge } from '../model/Challenge';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChallengeResponse } from '../model/ChallengeResponse';
import { AngularFireStorage } from '@angular/fire/storage';

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

  downloadUrl: Observable<string>
  profileUrl: Observable<string | null>;

  constructor(private authService: AuthService,
    private route: ActivatedRoute, private router: Router,
    private userService: UserService, private storage: AngularFireStorage) { }

  ngOnInit() {
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['']);
    }
    this.getUserProfile().then(() => {
      this.getUserProfileImg();
    });
  }

  async getUserProfile() {
    // Check if username specified in the URL
    const username = this.route.snapshot.paramMap.get('username');
    if (username === null) {
      this.userService.getCurrentUser()
        .subscribe(user => {
          this.user = user;
          this.listOfChallengesPosted$ = this.userService.getChallengesPostedByUser(this.user.username, '10');
          this.listOfChallengesTaken$ = this.userService.getChallengesTakenByUser(this.user.username, '10');
          this.username = this.user.username;
        });
    } else {
      this.userService.getUser(username)
        .subscribe(user => this.user = user);
        this.username = username;
    }
  }

  getUserProfileImg() {
    console.log('image: '+this.username)
    const filePath = this.username
    const ref = this.storage.ref(filePath);
    this.profileUrl = ref.getDownloadURL();
  }
}
