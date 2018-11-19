export class User {
    public static FIELDS_ALLOWED_TO_UPDATE = ['name', 'daetOfBirth', 'emailAddress', 'profileImageUrl'];

    username = '';
    name = '';
    dateOfBirth = new Date(Date.now()).toUTCString();
    emailAddress = '';
    profileImageUrl = '';

    private _totalScore;
    get totalScore() { return this._totalScore; }
    set totalScore(totalScore) { this._totalScore = totalScore; }

    private _numberOfChallengesPosted;
    get numberOfChallengesPosted() { return this._numberOfChallengesPosted; }
    set numberOfChallengesPosted(numberOfChallengesPosted) { this._numberOfChallengesPosted = numberOfChallengesPosted; }

    private _numberOfChallengesTaken;
    get numberOfChallengesTaken() { return this._numberOfChallengesTaken; }
    set numberOfChallengesTaken(numberOfChallengesTaken) { this._numberOfChallengesTaken = numberOfChallengesTaken; }

    private _datePosted;
    get datePosted() { return this._datePosted; }
    set datePosted(datePosted) { this._datePosted = datePosted; }

    private _dateModified;
    get dateModified() { return this._dateModified; }
    set dateModified(dateModified) { this._dateModified = dateModified; }


    constructor(user: Object = {}) {
        Object.assign(this, user);
    }

    getUser() {
        return {
            username: this.username,
            name: this.name,
            dateOfBirth: this.dateOfBirth,
            emailAddress: this.emailAddress,
            profileImageUrl: this.profileImageUrl,
            totalScore: this._totalScore,
            numberOfChallengesPosted: this._numberOfChallengesPosted,
            numberOfChallengesTaken: this._numberOfChallengesTaken,
            datePosted: this._datePosted,
            dateModified: this._dateModified
        };
    }
}
