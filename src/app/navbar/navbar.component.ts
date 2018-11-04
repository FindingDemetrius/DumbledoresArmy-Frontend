import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements DoCheck {
    login = false;

    constructor(private authService: AuthService) { }

    ngDoCheck() {
        this.login = this.authService.isSignedIn();
        console.log(`${this.login}`);
    }

    navigateToProfilePage() {
        console.log('Going to profile page');
    }

    logOutCurrentUser() {
        console.log('Sign Out user.');
        this.authService.doSignOut();
    }
}
