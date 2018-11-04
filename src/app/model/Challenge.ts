import { Question } from './Question';

export class Challenge {

    public static FIELDS_ALLOWED_TO_UPDATE = ['challengeName', 'tags', 'location'];

    challengeName: String = '';
    tags: String[] = [];
    location: Object = null;

    _questions: Question[];
    get questions() { return this._questions; }
    set questions(questions) { this._questions = questions; }

    _postedBy: String;
    get postedBy() { return this._postedBy; }
    set postedBy(postedBy) { this._postedBy = postedBy; }

    _datePosted: String;
    get datePosted() { return this._datePosted; }
    set datePosted(datePosted) { this._datePosted = datePosted; }

    _dateModified: String;
    get dateModified() { return this._dateModified; }
    set dateModified(dateModified) { this._dateModified = dateModified; }

    _numberOfAttempts: Number;
    get numberOfAttempts() { return this._numberOfAttempts; }
    set numberOfAttempts(numberOfAttempts) { this._numberOfAttempts = numberOfAttempts; }

    _id: String;
    get id() { return this._id; }
    set id(id) { this._id = id; }

    constructor(challengeObject: object) {
        Object.assign(this, challengeObject, {
            'questions': Object.assign({}, challengeObject['questions'])
        });
    }

    getChallenge() {
        return {
            challengeName: this.challengeName,
            tags: this.tags,
            location: this.location,
            questions: this._questions,
            postedBy: this._postedBy,
            datePosted: this._datePosted,
            dateModified: this._dateModified,
            numberOfAttempts: this._numberOfAttempts,
            id: this._id
        };
    }
}
