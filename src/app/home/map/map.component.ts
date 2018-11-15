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

  lat2 = this.latitude + 20;
  long2 = this.longitude + 30;

  lat3 = this.latitude - 25;
  long3 = this.longitude + 80;

  attemptText = "Attmept";

  //Detects when a marker is cliked on 
  clickedMarker(){
    console.log("Marker has been pressed!");
  }
}