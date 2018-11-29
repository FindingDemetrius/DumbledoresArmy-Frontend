import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from '../../../model/Challenge';
import { ChallengeService } from '../../../services/challenge.service';
import { AgmInfoWindow } from '@agm/core';


// TODO: Don't make req for challenges Posted after deleting a single challenge.
// Remove from the listOfChallengesPosted

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent implements OnInit {

  challengeObject: Challenge;
  isChallengeResponse = false;

  constructor(private router: Router, private challengeService: ChallengeService, private agmInfoWindow: AgmInfoWindow) { }

  @Input() challenge: Challenge;
  @Input() isBelongToUser: boolean;

  @Output() challengeResponseEventEmitter: EventEmitter<Challenge> = new EventEmitter<Challenge>();
  @Output() challengeDeletedResponseEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() challengeEditEventEmitter: EventEmitter<Challenge> = new EventEmitter<Challenge>();

  isChallengeEdit = false;

  onTapUsername() {
    this.router.navigate(['/users/' + this.challenge.postedBy]);
  }

  ngOnInit() {
  }

  onTakeChallenge(challenge: Challenge) {
    console.log(challenge);
    this.challengeResponseEventEmitter.emit(challenge);
  }

  onTapDeleteChallenge(challengeId: string) {
    this.challengeService.deleteChallenge(challengeId)
      .subscribe(isDeleted => {
        if (isDeleted === true) {
          this.agmInfoWindow.close();
          this.challengeDeletedResponseEventEmitter.emit(true);
          console.log('Challenge successfully deleted');
        }
      },
        error => {
          console.log(error);
        });
  }

  onTapEditChallenge() {
    this.challengeEditEventEmitter.emit(this.challenge);
    this.agmInfoWindow.close();
  }
}
