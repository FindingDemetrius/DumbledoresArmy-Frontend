import { Component, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})


/// <reference types="@types/googlemaps" />
export class MapComponent {
  latitude = 51.678418;
  longitude = 7.809007;
}