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

<<<<<<< HEAD
  user: User = new User();
  serverErrorResponse: String = "";
  challengeListArray: Challenge[];
=======
export class ProfileComponent implements OnInit {
    user: User = new User();
>>>>>>> Aayush-addServices

  sub: any;
  username: string = "";

<<<<<<< HEAD
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    // this.getUserProfile()
    // this.getChallenges()
    this.sub = this.route.params.subscribe(params => {
      this.username = params["username"];
    });

    this.userService.getUser(this.username).subscribe(
      user => {
        console.log(user)  
        this.user = user;
      },
      errorResponse => {
        this.serverErrorResponse = errorResponse;
      }
    );
    this.userService.getChallengesPostedByUser(this.username).subscribe(
        listOfChallenges => {
          console.log(listOfChallenges)  
          this.challengeListArray = listOfChallenges;
        },
        errorResponse => {
          this.serverErrorResponse = errorResponse;
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUserProfile() {
    // const username = this.route.snapshot.paramMap.get('username')
    // this.challengeService.getUser(username)
    //     .subscribe(user => this.user = user)
  }

  // getChallenges() {
  //     this.challengeService.getChallengeByUser(this.user.getUserId())
  //         .subscribe(challenges => this.challengeList = challenges)
  // }
=======
    ngOnInit() {
        this.getUserProfile();
    }

    getUserProfile() {
        const username = this.route.snapshot.paramMap.get('username');
        // this.challengeService.getUser(username)
        //     .subscribe(user => this.user = user)
    }
>>>>>>> Aayush-addServices
}
