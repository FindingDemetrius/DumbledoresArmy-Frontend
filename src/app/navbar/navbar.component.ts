import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
    login = false;

    constructor(private authService: AuthService) { }

    navigateToProfilePage() {
        console.log('Going to profile page');
    }

    logOutCurrentUser() {
        console.log('Sign Out user.');
        this.authService.doSignOut();
    }
}
