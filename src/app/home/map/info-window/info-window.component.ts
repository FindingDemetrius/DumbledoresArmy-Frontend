import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from '../../../model/Challenge';
import { ChallengeService } from '../../../services/challenge.service';
import { AgmInfoWindow } from '@agm/core';
import { CreateChallengeStateStorageService, ChallengeFormSignature } from '../../../services/create-challenge-state-storage.service';
import { ComponentInteractionService } from '../../../services/componentInteraction.service';
import { Route } from '@angular/compiler/src/core';


// TODO: Don't make req for challenges Posted after deleting a single challenge.
// Remove from the listOfChallengesPosted

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent implements OnInit {
  isChallengeResponse = false;

  constructor(private router: Router,
    private challengeService: ChallengeService,
    private agmInfoWindow: AgmInfoWindow,
    private challengeStateStorage: CreateChallengeStateStorageService,
    private componentInteractionService: ComponentInteractionService) { }

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
    const challengeToEdit: ChallengeFormSignature = {
      challengeName: this.challenge.challengeName,
      tags: this.challenge.tags,
      location: this.challenge.location,
      listOfQuestions: this.challenge.questions,
      id: this.challenge.id
    };
    console.log(challengeToEdit);
    this.challengeStateStorage.setChallengeData(challengeToEdit);
    this.componentInteractionService.toggleStateOfCreateChallengeComponent();
    this.componentInteractionService.toggleStateOfIsEditChallenge();
    // Toggle the state of isCreateChallengeModalOpen.
  }

  onUserAvatarClicked() {
    this.router.navigate(['profile/' + this.challenge.postedBy]);
  }
}
