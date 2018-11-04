import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../services/challenge.service';

import { User } from '../model/User';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
    user: User = new User();

    constructor(private route: ActivatedRoute, private challengeService: ChallengeService) { }

    ngOnInit() {
        this.getUserProfile();
    }

    getUserProfile() {
        const username = this.route.snapshot.paramMap.get('username');
        // this.challengeService.getUser(username)
        //     .subscribe(user => this.user = user)
    }
}
