import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})


/// <reference types="@types/googlemaps" />
export class MapComponent {
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    ngOnInit() {
        var mapProp = {
            center: new google.maps.LatLng(18.5793, 73.8143),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
}