import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../model/Challenge';
import { ChallengeService } from '../../services/challenge.service';
import { ComponentInteractionService } from '../../services/componentInteraction.service';
import { CreateChallengeStateStorageService } from '../../services/create-challenge-state-storage.service';
import { UserService } from '../../services/user.service';
import { User } from './../../model/User';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

    zoom = 8;
    lat: Number;
    lng: Number;
    isChallengeResponseDialogOpen = false;
    tappedChallenge: Challenge;
    mapOpen = false;
    isMapClickable = false;
    isLoggedIn = false;
    isShowEditChallengeDialogBox = false;

    private challengeListObservale$: Observable<Challenge[]>;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    ngOnInit() {
        // Set the lat and long from the component interactor service for start. 
        this.lat = this.componentInteractor.location[0];
        this.lng = this.componentInteractor.location[1];
        console.log('Maps Component started');
        this.componentInteractor.changeInUserCurrentStatus.subscribe(isLoggedIn => {
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

        this.componentInteractor.EmitterUpdateTheFocusOfMap.subscribe(location => {
            this.lat = location[0];
            this.lng = location[1];
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
            const geocoder = new google.maps.Geocoder();
            const latlng = new google.maps.LatLng(mouseEvent.coords.lat, mouseEvent.coords.lng);
            const request: google.maps.GeocoderRequest = {
                location: latlng
            };

            geocoder.geocode(request, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0] != null) {
                        console.log(results[0].formatted_address);
                        const addr = results[0].formatted_address;
                        const location = {
                            'latitude': mouseEvent.coords.lat,
                            'longitude': mouseEvent.coords.lng,
                            'address': addr
                        };
                        console.log('Map clicked' + location);
                        // Update the challennge storage service with the location data.
                        this.challengeDataStore.setLocation(location);
                        this.componentInteractor.sendLocationObjectToCreateChallengeCompoenent(location);
                    } else {
                        alert('No address');
                    }
                }
            });
        }
    }

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
    }
}
