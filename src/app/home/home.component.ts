import { Component, OnInit, DoCheck } from '@angular/core';
import { MapComponent } from './map/map.component';
import { AuthService } from '../services/auth.service';
import { ComponentInteractionService } from '../services/componentInteraction.service';
import { Challenge } from '../model/Challenge';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, DoCheck {
    title = 'geo-quiz-frontend';
    login = false;
    isModalOpen = true;
    isCreateChallengeOpen = false;

    challengeToEdit: Challenge = new Challenge({});

    constructor(private authService: AuthService,
        private componentInteractor: ComponentInteractionService) { }


    ngOnInit() {
        if (this.authService.isSignedIn()) {
            this.login = true;
            this.isModalOpen = false;
        }
        this.componentInteractor.change.subscribe(isChallengeModalOpen => {
            this.isCreateChallengeOpen = isChallengeModalOpen;
        });
    }

    ngDoCheck() {
        if (this.authService.isSignedIn()) {
            this.login = true;
            this.isModalOpen = false;
        }
    }

    onEditChallenge(challenge: Challenge) {
        this.challengeToEdit = challenge;
        this.componentInteractor.toggleStateOfCreateChallengeComponent();
    }

}
