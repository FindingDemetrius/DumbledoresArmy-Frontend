import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private router: Router) { }

  @Input() challenge: Challenge;

  onTapUsername() {
    this.router.navigate(['/users/' + this.challenge.postedBy]);
  }

  ngOnInit() {
  }

}
