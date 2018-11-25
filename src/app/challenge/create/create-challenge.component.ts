import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionPost } from '../../model/QuestionPost';
import { Challenge } from '../../model/Challenge';
import { ChallengeService } from '../../services/challenge.service';
import { IQuestion } from '../../model/IQuestion';

@Component({
    selector: 'app-create-challenge',
    templateUrl: 'create-challenge.component.html',
    styleUrls: ['create-challenge.component.css']
})

export class CreateChallengeComponent {

    public createChallengeForm: FormGroup;
    public newTag = '';
    public listOfTags: String[] = [];
    public listOfQuestions: IQuestion[] = [];

    constructor(private fb: FormBuilder, private challengeService: ChallengeService) {
        this.createChallengeForm = fb.group({
            challengeName: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required]
        });
    }

    doCreateChallenge() {
        const challengeName = this.createChallengeForm.get('challengeName').value;
        const latitude = this.createChallengeForm.get('latitude').value;
        const longitude = this.createChallengeForm.get('longitude').value;
        console.log(challengeName, latitude, longitude, this.listOfTags, this.listOfQuestions);
        console.log('Create new challenge');
        // Create an object for questions.
        const challenge = new Challenge({
            'challengeName': this.createChallengeForm.get('challengeName').value,
            'tags': this.listOfTags,
            'location': {
                'latitude': this.createChallengeForm.get('latitude').value,
                'longitude': this.createChallengeForm.get('longitude').value
            },
            'questions': this.listOfQuestions
        });
        console.log(challenge);
        this.challengeService.createChallenge(challenge)
            .subscribe((ch: Challenge) => {
                console.log(ch);
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


}
