import { IQuestion } from './IQuestion';

export class QuestionPost implements IQuestion {
    questionText: String = '';
    choices: String[] = [];
    correctChoice: number;

    constructor(questionObject: object) {
        Object.assign(this, questionObject);
    }

    getQuestion() {
        return {
            questionText: this.questionText,
            choices: this.choices,
            correctChoice: this.correctChoice
        };
    }
}
