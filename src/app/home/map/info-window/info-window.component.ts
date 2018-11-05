import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from '../../../model/Challenge';
import { ChallengeService } from '../../../services/challenge.service';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent implements OnInit {

  challengeObject: Challenge;
  isChallengeResponse = false;

  constructor(private router: Router) { }

  @Input() challenge: Challenge;

  @Output() challengeResponseEventEmitter: EventEmitter<Challenge> = new EventEmitter<Challenge>();

  onTapUsername() {
    this.router.navigate(['/users/' + this.challenge.postedBy]);
  }

  ngOnInit() {
  }

  onTakeChallenge(challenge: Challenge) {
    console.log(challenge);
    this.challengeResponseEventEmitter.emit(challenge);
  }
}
