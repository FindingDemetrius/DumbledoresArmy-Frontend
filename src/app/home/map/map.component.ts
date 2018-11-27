import { Component, ViewChild, OnInit } from '@angular/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../model/Challenge';
import { ChallengeService } from '../../services/challenge.service';
import { ComponentInteractionService } from '../../services/componentInteraction.service';
import { CreateChallengeStateStorageService } from '../../services/create-challenge-state-storage.service';
<<<<<<< HEAD
import { UserService } from '../../services/user.service';
import { User } from './../../model/User';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
=======
>>>>>>> profile

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
    zoom = 8;
    lat = 51.673858;
    lng = 7.815982;
    isChallengeResponseDialogOpen = false;
    tappedChallenge: Challenge;
    mapOpen = false;
    isMapClickable = false;
<<<<<<< HEAD
    isLoggedIn = false;
=======
>>>>>>> profile

    private challengeListObservale$: Observable<Challenge[]>;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    ngOnInit() {
        console.log('Maps Component started');
        this.componentInteractor.updateTheChallengesWhenTheUserIsLoggedIn.subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
            // Get the current user after logged in.
        });

        this.challengeListObservale$ = this.challengeService.getListOfChallenges();

        this.componentInteractor.changeMapOpenState.subscribe(isMapOpen => {
            this.isMapClickable = isMapOpen;
        });

        this.componentInteractor.isNewChallengeAvailable.subscribe(isAvailable => {
            if (isAvailable) {
                this.challengeListObservale$ = this.challengeService.getListOfChallenges();
                this.componentInteractor.toggleStateOfNewChallenges();
            }
        });
    }

    refreshHomePage() {
        this.challengeListObservale$ = this.challengeService.getListOfChallenges();

        this.componentInteractor.changeMapOpenState.subscribe(isMapOpen => {
            this.isMapClickable = isMapOpen;
        });

        this.componentInteractor.isNewChallengeAvailable.subscribe(isAvailable => {
            if (isAvailable) {
                this.challengeListObservale$ = this.challengeService.getListOfChallenges();
                this.componentInteractor.toggleStateOfNewChallenges();
            }
        });
    }

    refreshHomePage() {
        this.challengeListObservale$ = this.challengeService.getListOfChallenges();
    }

    onTapMarker(challenge: Challenge) {
        console.log(challenge);
    }

    showChallengeResponseDialog(challenge: Challenge) {
        console.log('From the map component');
        this.tappedChallenge = challenge;
        this.isChallengeResponseDialogOpen = true;
    }

    changeIsModalOpen(isComplete: boolean) {
        console.log('Lah bhayo aba banda gareko!');
        this.isChallengeResponseDialogOpen = false;
    }

    mapClickedEvent(mouseEvent: AGMMouseEvent) {
        // Check if mapOpen is true.
        // Get the lat and long and pass it to the create challenge component.
        if (this.isMapClickable) {
            const location = {
                'latitude': mouseEvent.coords.lat,
                'longitude': mouseEvent.coords.lng
            };
            console.log('Map clicked' + location);
            // Update the challennge storage service with the location data.
            this.challengeDataStore.setLocation(location);
            this.componentInteractor.sendLocationObjectToCreateChallengeCompoenent(location);
        }
    }

<<<<<<< HEAD
    isChallengePostedByUser(challenge: Challenge) {
        return this.sessionService.username === challenge.postedBy;
    }

    filterByIsPostedByUser(listOfChallenges: Challenge[]): Challenge[] {
        if (!this.isLoggedIn) {
            return listOfChallenges;
        }
        return listOfChallenges.filter(challenge => this.isChallengePostedByUser(challenge));
    }

    filterByNotPostedByUser(listOfChallenges: Challenge[]): Challenge[] {
        if (!this.isLoggedIn) {
            return [];
        }
        return listOfChallenges.filter(challenge => !this.isChallengePostedByUser(challenge));
    }

    constructor(private challengeService: ChallengeService,
        private componentInteractor: ComponentInteractionService,
        private challengeDataStore: CreateChallengeStateStorageService,
        private sessionService: SessionService,
        private authService: AuthService) {
=======
    constructor(private challengeService: ChallengeService,
        private componentInteractor: ComponentInteractionService,
        private challengeDataStore: CreateChallengeStateStorageService) {
>>>>>>> profile
    }
}
