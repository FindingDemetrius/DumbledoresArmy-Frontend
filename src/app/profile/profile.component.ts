import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChallengeService } from "../services/challenge.service";

import { User } from "../model/User";
import { Challenge } from "../model/Challenge";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html",
  styleUrls: ["profile.component.css"]
})
export class ProfileComponent implements OnInit, OnDestroy {

export class ProfileComponent implements OnInit {
  user: User = new User();

  sub: any;
  username: string = "";

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    const username = this.route.snapshot.paramMap.get('username');
    // this.challengeService.getUser(username)
    //     .subscribe(user => this.user = user)
  }
}
