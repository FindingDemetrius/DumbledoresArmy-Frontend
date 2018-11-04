import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {

  constructor(private authService: AuthService) { }

  ngOnDestroy() {
    console.log('in onDestroy');
    this.authService.doSignOut();
  }
}
