import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionPost } from '../../../model/QuestionPost';

@Component({
    selector: 'app-questions-challenge',
    templateUrl: 'questions-challenge.component.html'
})

export class QuestionsChallengeComponent {

    @Output() addNewQuestion: EventEmitter<QuestionPost> = new EventEmitter<QuestionPost>();

    public createQuestionForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.createQuestionForm = formBuilder.group({
            questionText: ['', Validators.required],
            option1: ['', Validators.required],
            option2: ['', Validators.required],
            option3: ['', Validators.required],
            option4: ['', Validators.required],
            correctChoice: ['', Validators.required]
        });
    }

    onAddNewQuestion() {
        const question = new QuestionPost({
            'questionText': this.createQuestionForm.get('questionText').value,
            'choices': [
                this.createQuestionForm.get('option1').value,
                this.createQuestionForm.get('option2').value,
                this.createQuestionForm.get('option3').value,
                this.createQuestionForm.get('option4').value,
            ],
            'correctChoice': this.createQuestionForm.get('correctChoice').value
        });
        console.log(question);
        this.addNewQuestion.emit(question);

        // Clear out all the fields.

        this.createQuestionForm.reset();
    }
}
