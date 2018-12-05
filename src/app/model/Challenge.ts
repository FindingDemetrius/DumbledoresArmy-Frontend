import { Question } from './Question';
import { IQuestion } from './IQuestion';

export class Challenge {

    public static FIELDS_ALLOWED_TO_UPDATE = ['challengeName', 'tags', 'location'];

    challengeName: String = '';
    tags: String[] = [];
    location: Object = null;

    _questions: IQuestion[];
    get questions() { return this._questions; }
    set questions(questions) { this._questions = questions; }

    _postedBy: String;
    get postedBy() { return this._postedBy; }
    set postedBy(postedBy) { this._postedBy = postedBy; }

    _postedByName: String;
    get postedByName() { return this._postedByName; }
    set postedByName(postedByName) { this._postedByName = postedByName; }

    _postedByEmail: String;
    get postedByEmail() { return this._postedByEmail; }
    set postedByEmail(postedByEmail) { this._postedByEmail = postedByEmail; }

    _datePosted: String;
    get datePosted() { return this._datePosted; }
    set datePosted(datePosted) { 
        this._datePosted = datePosted; 
        //Cuts the excessive text out in the date
        this._datePosted = this._datePosted.substring(0, 16);
    }

    _dateModified: String;
    get dateModified() { return this._dateModified; }
    set dateModified(dateModified) { this._dateModified = dateModified; }

    _numberOfAttempts: Number;
    get numberOfAttempts() { return this._numberOfAttempts; }
    set numberOfAttempts(numberOfAttempts) { this._numberOfAttempts = numberOfAttempts; }

    _numberOfQuestions: Number;
    get numberOfQuestions() { return this._questions.length; }

    _id: String;
    get id() { return this._id; }
    set id(id) { this._id = id; }

    constructor(challengeObject: object) {
        Object.assign(this, challengeObject);
    }

    getChallenge() {
        return {
            challengeName: this.challengeName,
            tags: this.tags,
            location: this.location,
            questions: this._questions,
            postedBy: this._postedBy,
            postedByName: this._postedByName,
            postedByEmail: this._postedByEmail,
            datePosted: this._datePosted,
            dateModified: this._dateModified,
            numberOfAttempts: this._numberOfAttempts,
            id: this._id
        };
    }

    getChallengeWhenCreatingChallenge() {
        return {
            challengeName: this.challengeName,
            tags: this.tags,
            location: this.location,
            questions: this._questions
        };
    }
}
