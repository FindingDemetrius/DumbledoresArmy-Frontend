import { Component, OnInit, ViewChild, ElementRef, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material'

import { ChallengeService } from '../../services/challenge.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Challenge } from '../../model/Challenge';
import { QuestionPost } from '../../model/QuestionPost';
import { IQuestion } from '../../model/IQuestion';
import { ComponentInteractionService } from '../../services/componentInteraction.service';
import { CreateChallengeStateStorageService, ChallengeFormSignature } from '../../services/create-challenge-state-storage.service';

@Component({
    selector: 'app-create-challenge',
    templateUrl: 'create-challenge.component.html',
    styleUrls: ['create-challenge.component.css']
})

export class CreateChallengeComponent implements OnInit, OnDestroy {

    public createChallengeForm: FormGroup;
    public newTag = '';
    public listOfTags: String[] = [];
    public listOfQuestions: IQuestion[] = [];
    basic = true;
    location: Object = null;

    constructor(private fb: FormBuilder,
        private challengeService: ChallengeService,
        private componentInteractor: ComponentInteractionService,
        private challengeDataStore: CreateChallengeStateStorageService) {
        // Check if the service has data.

        this.createChallengeForm = fb.group({
            challengeName: ['', Validators.required]
        });

        const challengeData: ChallengeFormSignature = this.challengeDataStore.getChallengeData();
        if (challengeData != null) {
            // Retrieve data from the challenge object.
            this.createChallengeForm.patchValue({
                'challengeName': challengeData.challengeName != null ? challengeData.challengeName : ''
            });
            this.listOfTags = challengeData.tags != null ? challengeData.tags : [];
            this.location = challengeData.location != null ? challengeData.location : {};
            this.listOfQuestions = challengeData.listOfQuestions != null ? challengeData.listOfQuestions : [];
        }
    }

    ngOnInit() {
        console.log('Calling on init');
    }

    ngOnDestroy() {
        console.log('Calling on Destroy.');
        // Store the data in one service so that you can use it when returning back.
        if (this.location == null) {
            const challengeData: ChallengeFormSignature = {
                challengeName: this.createChallengeForm.get('challengeName').value,
                listOfQuestions: this.listOfQuestions,
                tags: this.listOfTags,
                location: {}
            };
            console.log(challengeData);
            this.challengeDataStore.setChallengeData(challengeData);
            // After reading from the service, set the data to null.
        } else {
            this.challengeDataStore.flushStorage();
        }
    }

    doCreateChallenge() {
        const challenge = new Challenge({
            'challengeName': this.createChallengeForm.get('challengeName').value,
            'tags': this.listOfTags,
            'location': this.location,
            'questions': this.listOfQuestions
        });
        console.log(challenge);
        this.challengeService.createChallenge(challenge)
            .subscribe((ch: Challenge) => {
                // Update the UI with the new questions.
                this.componentInteractor.toggleStateOfNewChallenges();
                this.componentInteractor.toggleStateOfCreateChallengeComponent();
            },
                errorMessage => {
                    console.log(errorMessage);
                });
    }

    onAddNewTag() {
        console.log(this.newTag);
        this.listOfTags.push(this.newTag);
        this.newTag = '';
    }

    onCreateNewQuestion(question: QuestionPost) {
        this.listOfQuestions.push(question);
    }

    removeTag(tagToDelete) {
        this.listOfTags = this.listOfTags.filter(tag => tag !== tagToDelete);
    }

    onShowMapButtonClicked() {
        // Hide create challenge component.
        // Change the isClickable of maps component to true.
        // Get the location from the maps component.
        this.componentInteractor.toggleStateOfCreateChallengeComponent();
        this.componentInteractor.toggleStateOfIsMapOpen();
    }
}
