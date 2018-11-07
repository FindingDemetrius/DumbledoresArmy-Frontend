<<<<<<< HEAD
import { Component, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
=======
import { Component, ViewChild, OnInit } from '@angular/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../model/Challenge';
import { ChallengeService } from '../../services/challenge.service';
>>>>>>> Aayush-addServices

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

<<<<<<< HEAD
/// <reference types="@types/googlemaps" />
export class MapComponent {
  latitude = 51.678418;
  longitude = 7.809007;
}
=======
    private challengeListObservale: Observable<Challenge[]>;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    ngOnInit() {
        console.log('Maps Component started');
        this.challengeListObservale = this.challengeService.getListOfChallenges();
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

    constructor(private challengeService: ChallengeService) {
    }
}

// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
>>>>>>> Aayush-addServices
