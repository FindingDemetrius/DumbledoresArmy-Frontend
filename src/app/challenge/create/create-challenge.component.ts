import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

import { Genre } from '../../model/Genre';
import { ChallengeService } from '../../services/challenge.service';

@Component({
    selector: 'create-challenge',
    templateUrl: 'create-challenge.component.html',
    styleUrls: ['create-challenge.component.css']
})

export class CreateChallengeComponent implements OnInit {

    genres: Genre[] = []

    constructor(private fb: FormBuilder, private challengeService: ChallengeService) { }

    challengeForm = this.fb.group({
        questions: this.fb.array([
            this.fb.control('')
        ])
    })

    ngOnInit() {
        this.getGenres()
    }

    getGenres() {
        this.challengeService.getGenresList()
            .subscribe(genres => this.genres = genres)
    }

    get questions() {
        return this.challengeForm.get('questions') as FormArray
    }

    addQuestion() {
        this.questions.push(this.fb.control(''))
    }
}