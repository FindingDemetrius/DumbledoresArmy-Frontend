import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material'

import { ChallengeService } from '../../services/challenge.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Challenge } from '../../model/Challenge';

@Component({
    selector: 'create-challenge',
    templateUrl: 'create-challenge.component.html',
    styleUrls: ['create-challenge.component.css']
})

export class CreateChallengeComponent implements OnInit {

    visible = true
    selectable = true
    removable = true
    addOnBlur = true
    separatorKeyCodes: number[] = [ENTER, COMMA]
    genreCtrl = new FormControl()
    filteredGenres: Observable<string[]>
    genres: string[] = []
    allGenres: string[] = []
    choice: number[] = [1,2,3,4]

    challenge: Challenge
    challengeForm: FormGroup

    q_index = 1

    @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>
    @ViewChild('auto') matAutoComplete: MatAutocomplete

    constructor(private fb: FormBuilder, private challengeService: ChallengeService) {
        this.filteredGenres = this.genreCtrl.valueChanges.pipe(
            startWith(null),
            map((genre: string | null) => genre ? this._filter(genre) : this.allGenres.slice())
        )
    }

    ngOnInit() {
        this.getGenres()
        this.createForm()
    }

    createForm() {
        this.challengeForm = new FormGroup({
            challengeName: new FormControl(''),
            tags: new FormArray([
                new FormControl('')
            ]),
            location: new FormGroup({
                city: new FormControl(''),
                country: new FormControl('')
            }),
            questions: new FormArray([
                this.initQuestionBlock()
            ])
        })
    }

    initQuestionBlock() {
        return new FormGroup({
            [''+this.q_index]: new FormGroup({
                questionText: new FormControl(''),
                choices: new FormArray([
                    new FormControl(''),
                    new FormControl(''),
                    new FormControl(''),
                    new FormControl('')
                ]),
                correctAnswerIndex: new FormControl('')
            })
        })
    }

    addQuestion() {
        if (this.q_index < 10) {
            this.q_index++
            let questions = this.challengeForm.get('questions') as FormArray
            questions.push(this.initQuestionBlock())
        } else {
            alert('Max question size is 10')
        }
    }

    removeQuestion() {
        if (this.q_index > 1) {
            this.q_index--
            const control = this.challengeForm.get('questions') as FormArray
            control.removeAt(this.q_index)
        } else {
            alert('Challenges must have at least one question')
        }
    }

    getQuestions(form) {
        return form.controls.questions.controls
    }

    getChoices(form) {
        return form.controls.choices.controls
    }

    getGenres() {
        this.challengeService.getGenresList()
            .subscribe(genres => this.allGenres = genres)
    }

    add(event: MatChipInputEvent) {
        if (!this.matAutoComplete.isOpen) {
            const input = event.input
            const value = event.value

            if ((value || '').trim()) {
                this.genres.push(value.trim())
            }

            if (input) {
                input.value = ''
            }

            this.genreCtrl.setValue(null)
        }
    }

    remove(genre: string) {
        const index = this.genres.indexOf(genre)

        if (index >= 0) {
            this.genres.splice(index, 1)
        }
    }

    selected(event: MatAutocompleteSelectedEvent) {
        this.genres.push(event.option.viewValue)
        this.genreInput.nativeElement.value = ''
        this.genreCtrl.setValue(null)
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase()

        return this.allGenres.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0)
    }
}