import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  isCreateChallengeComponentOpen = false;
  isMapForAddingLocationOpen = false;
  newChallenges = false;
  isLoggedIn = false;
  isEditChallenge = false;

  location = [51.673858, 7.815982];

  @Output() editChallenge: EventEmitter<boolean> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMapOpenState: EventEmitter<boolean> = new EventEmitter();
  @Output() updateWhenLocationSelected: EventEmitter<Object> = new EventEmitter();
  @Output() isNewChallengeAvailable: EventEmitter<boolean> = new EventEmitter();
  @Output() changeInUserCurrentStatus: EventEmitter<boolean> = new EventEmitter();

  @Output() EmitterUpdateTheFocusOfMap: EventEmitter<number[]> = new EventEmitter();

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

  toggleStateOfIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn;
    this.changeInUserCurrentStatus.emit(this.isLoggedIn);
  }

  toggleStateOfIsEditChallenge() {
    this.isEditChallenge = !this.isEditChallenge;
    this.editChallenge.emit(this.isEditChallenge);
  }

  sendLocationObjectToCreateChallengeCompoenent(location: Object) {
    // Set the show challenge component to true.
    // Send the location.
    // Toggle state of isMapOpen.
    this.toggleStateOfCreateChallengeComponent();
    this.toggleStateOfIsMapOpen();
  }

  updateFocusOfMap(location: number[]) {
    this.location = location;
    this.EmitterUpdateTheFocusOfMap.emit(this.location);
  }
}
