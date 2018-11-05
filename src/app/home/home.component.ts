import { Component, OnInit, DoCheck } from '@angular/core';
import { MapComponent } from './map/map.component';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, DoCheck {
    title = 'geo-quiz-frontend';
    login = false;
    isModalOpen = true;

    constructor(private authService: AuthService) { }


    ngOnInit() {
        if (this.authService.isSignedIn()) {
            this.login = true;
            this.isModalOpen = false;
        }
    }

    ngDoCheck() {
        if (this.authService.isSignedIn()) {
            this.login = true;
            this.isModalOpen = false;
        }
    }

}
