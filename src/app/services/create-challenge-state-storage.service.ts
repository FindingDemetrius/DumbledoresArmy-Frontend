import { Injectable, Output, EventEmitter } from '@angular/core';
import { Question } from './../model/Question';
import { ComponentInteractionService } from './componentInteraction.service';
@Injectable({
  providedIn: 'root'
})
export class CreateChallengeStateStorageService {

  challengeData: ChallengeFormSignature;

  constructor(private componentInteractor: ComponentInteractionService) {
    this.componentInteractor.updateWhenLocationSelected.subscribe(location => {
      console.log('Subscribing to location.');
      this.challengeData.location = location;
    });
  }

  public getChallengeData(): ChallengeFormSignature {
    return this.challengeData;
  }

  public setChallengeData(challengeData: ChallengeFormSignature) {
    this.challengeData = challengeData;
  }

  public setLocation(location: Object) {
    this.challengeData.location = location;
  }

  public flushStorage(): void {
    this.challengeData = {
      challengeName: '',
      tags: [],
      location: {},
      listOfQuestions: []
    };
  }
}

export interface ChallengeFormSignature {
  challengeName: String;
  tags: String[];
  location: Object;
  listOfQuestions: Question[];
}

