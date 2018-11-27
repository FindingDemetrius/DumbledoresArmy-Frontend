import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  isCreateChallengeComponentOpen = false;
  isMapForAddingLocationOpen = false;
  newChallenges = false;
<<<<<<< HEAD
  isLoggedIn = false;
=======
>>>>>>> profile

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMapOpenState: EventEmitter<boolean> = new EventEmitter();
  @Output() updateWhenLocationSelected: EventEmitter<Object> = new EventEmitter();
  @Output() isNewChallengeAvailable: EventEmitter<boolean> = new EventEmitter();
<<<<<<< HEAD
  @Output() updateTheChallengesWhenTheUserIsLoggedIn: EventEmitter<boolean> = new EventEmitter();
=======
>>>>>>> profile

  constructor() { }

  toggleStateOfCreateChallengeComponent() {
    this.isCreateChallengeComponentOpen = !this.isCreateChallengeComponentOpen;
    this.change.emit(this.isCreateChallengeComponentOpen);
  }

  toggleStateOfIsMapOpen() {
    this.isMapForAddingLocationOpen = !this.isMapForAddingLocationOpen;
    this.changeMapOpenState.emit(this.isMapForAddingLocationOpen);
  }

  toggleStateOfNewChallenges() {
    this.newChallenges = !this.newChallenges;
    this.isNewChallengeAvailable.emit(this.newChallenges);
  }

<<<<<<< HEAD
  toggleStateOfIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn;
    this.updateTheChallengesWhenTheUserIsLoggedIn.emit(true);
  }

=======
>>>>>>> profile
  sendLocationObjectToCreateChallengeCompoenent(location: Object) {
    // Set the show challenge component to true.
    // Send the location.
    // Toggle state of isMapOpen.
    this.toggleStateOfCreateChallengeComponent();
    this.toggleStateOfIsMapOpen();
  }
}
