import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'questions-challenge',
    templateUrl: 'questions-challenge.component.html'
})

export class QuestionsChallengeComponent {

    numQuestions: number = 1
    challengeForm: FormGroup

    constructor(private fb: FormBuilder) {
        this.createForm()
    }

    createForm() {
        this.challengeForm = new FormGroup({
            questions: new FormArray([
                this.fb.control(''),
                this.initAnswers()
            ])
        })
    }

    initAnswers() {
        return new FormGroup({
            correctAnswer: new FormControl(''),
            wrongAnswers: new FormArray([
                this.fb.control(''),
                this.fb.control(''),
                this.fb.control('')
            ])
        })
    }

    get questions() {
        return this.challengeForm.get('questions') as FormArray
    }

    addQuestion() {
        if (this.numQuestions <= 10) {
            this.questions.push(this.fb.control(''))
            this.numQuestions += 1
        }
        else {
            alert('Max question size is 10')
        }
    }

    removeQuestion(index) {
        if(this.numQuestions > 1) {
            this.questions.removeAt(index)
            this.numQuestions -= 1
        }
        else {
            alert('You must have at least 1 question.')
        }
    }

    getQuestions(form) {
        return form.controls.questions.controls
    }

    getWrongAnswers(form) {
        return form.controls.answers.controls
    }
}