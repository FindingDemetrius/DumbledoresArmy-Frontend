export class Question {
    questionText: String = '';
    choices: String[] = [];

    constructor(questionObject: object) {
        Object.assign(this, questionObject);
    }

    getQuestion() {
        return {
            questionText: this.questionText,
            choices: this.choices
        };
    }
}
