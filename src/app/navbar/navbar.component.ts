import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ComponentInteractionService } from '../services/componentInteraction.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  private selected: String;

  searchChallenge: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private navBarService: ComponentInteractionService) {
  }

  navigateToProfilePage() {
    console.log('Going to profile page');
    this.router.navigate(['me']);
  }

  logOutCurrentUser() {
    console.log('Sign Out user.');
    this.authService.doSignOut();
  }

  onSearchBarText(searchString: String) {
    console.log(searchString);
  }

  onCreateNewChallenge() {
    console.log('Create challenge tapped');
    this.navBarService.toggleStateOfCreateChallengeComponent();
  }
}
