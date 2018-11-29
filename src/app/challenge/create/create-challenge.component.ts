import { Component, OnInit, ViewChild, ElementRef, Output, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionPost } from '../../model/QuestionPost';
import { Challenge } from '../../model/Challenge';
import { ChallengeService } from '../../services/challenge.service';
import { IQuestion } from '../../model/IQuestion';
import { ComponentInteractionService } from '../../services/componentInteraction.service';
import { CreateChallengeStateStorageService, ChallengeFormSignature } from '../../services/create-challenge-state-storage.service';

@Component({
    selector: 'app-create-challenge',
    templateUrl: 'create-challenge.component.html',
    styleUrls: ['create-challenge.component.css']
})

export class CreateChallengeComponent implements OnInit, OnDestroy {


    @Input() challengeToEdit: Challenge;

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
        if (challengeData !== null) {
            // Retrieve data from the challenge object.
            this.createChallengeForm.patchValue({
                'challengeName': challengeData.challengeName !== null ? challengeData.challengeName : ''
            });
            this.listOfTags = challengeData.tags !== null ? challengeData.tags : [];
            this.location = challengeData.location !== null ? challengeData.location : {};
            this.listOfQuestions = challengeData.listOfQuestions !== null ? challengeData.listOfQuestions : [];
        }
    }

    ngOnInit() {
        console.log('Calling on init');
        if (this.challengeToEdit !== null || this.challengeToEdit !== undefined) {
            console.log(this.challengeToEdit);
            this.createChallengeForm.patchValue({
                'challengeName': this.challengeToEdit.challengeName !== null ? this.challengeToEdit.challengeName : ''
            });
            this.listOfTags = this.challengeToEdit.tags !== null ? this.challengeToEdit.tags : [];
            this.location = this.challengeToEdit.location !== null ? this.challengeToEdit.location : {};
            this.listOfQuestions = this.challengeToEdit.questions !== null ? this.challengeToEdit.questions : [];
        }
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
            this.location = null;
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

    doEditChallenge() {
        console.log('Editing a challenge');
        const updateObject = {};

        if (this.createChallengeForm.get('challengeName').value !== this.challengeToEdit.challengeName) {
            updateObject['challengeName'] = this.createChallengeForm.get('challengeName').value;
        }
        if (this.challengeToEdit.tags !== this.listOfTags) {
            updateObject['tags'] = this.listOfTags;
        }
        // if (this.challengeToEdit.location !== this.location) {
        //     updateObject['location'] = this.location;
        // }
        // if (this.challengeToEdit.questions !== this.listOfQuestions) {
        //     updateObject['questions'] = this.listOfQuestions;
        // }
        console.log(updateObject);
        this.challengeService.editChalleneg(updateObject, this.challengeToEdit.id)
            .subscribe(challenge => {
                this.componentInteractor.toggleStateOfCreateChallengeComponent();
            },
                error => {
                    console.log(error);
                });
    }

    isChallengeToEditEmpty() {
        return this.challengeToEdit.challengeName === '';
    }

    isLocationObjectEmpty(location: Object) {
        return Object.keys(this.location).length === 0;
    }
}
