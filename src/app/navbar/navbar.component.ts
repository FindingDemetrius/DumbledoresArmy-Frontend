import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements DoCheck {
    login: boolean = false

    constructor(private authService: AuthService) { }

    ngDoCheck() {
        this.login = this.authService.authenticated
        console.log(`${this.login}`)
    }
}