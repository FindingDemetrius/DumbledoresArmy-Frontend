import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer-challenge',
  templateUrl: './answer-challenge.component.html',
  styleUrls: ['./answer-challenge.component.css']
})
export class AnswerChallengeComponent implements OnInit {

  challengeId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.challengeId = this.route.snapshot.paramMap.get('challengeId');
  }

}
