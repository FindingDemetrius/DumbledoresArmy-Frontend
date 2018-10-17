import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})

export class HomeComponent {
    title = 'geo-quiz-frontend';
}