import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrWizard } from '@clr/angular';
import { Challenge } from '../../model/Challenge';
import { ChallengeService } from '../../services/challenge.service';
import { Observable } from 'rxjs';
import { ChallengeResponse } from '../../model/ChallengeResponse';

@Component({
  selector: 'app-answer-challenge',
  templateUrl: './answer-challenge.component.html',
  styleUrls: ['./answer-challenge.component.css']
})
export class AnswerChallengeComponent implements OnInit {
  @Input() challenge: Challenge;
  challengeResponseIndex: Number[];
  mdOpen = true;

  Object = Object;

  constructor(private route: ActivatedRoute, private challengeService: ChallengeService) { }
  @ViewChild('answerChallengeWizard') wizardMedium: ClrWizard;

  ngOnInit() {
    this.challengeResponseIndex = Array.from({ length: Object.keys(this.challenge.questions).length }).map(x => -1);
    console.log('Answer challenge rendered');
  }

  onResponseForChallenge(key: string, index: string) {
    console.log('For key', key);
    this.challengeResponseIndex[key] = index;

  }

  onChallengeAnswered() {
    console.log('Challenge Complete');
    console.log(this.challengeResponseIndex);
    const challengeResponse = new ChallengeResponse(
      {
        numberOfQuestions: this.challengeResponseIndex.length,
        questionChoices: this.challengeResponseIndex,
      });
    this.challengeService.postChallengeResponse(challengeResponse, this.challenge.id).
      subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }


}
