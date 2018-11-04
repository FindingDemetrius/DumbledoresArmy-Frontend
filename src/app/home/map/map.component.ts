import { Component, ViewChild, OnInit } from '@angular/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../model/Challenge';
import { ChallengeService } from '../../services/challenge.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
    zoom = 8;
    lat = 51.673858;
    lng = 7.815982;

    private challengeListObservale: Observable<Challenge[]>;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    ngOnInit() {
        console.log('Maps Component started');
        this.challengeListObservale = this.challengeService.getListOfChallenges();
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
