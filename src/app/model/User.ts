
export class User {

    username = '';
    name = '';
    dateOfBirth = new Date(Date.now());
    emailAddress = '';
    profileImageUrl = '';
    totalScore = 0;
    challengesPostedRef = [];
    challengesTakenRef = [];
    numberOfChallengesPosted = 0;
    numberOfChallengesTaken = 0;
    datePosted = new Date(Date.now());
    dateModified = new Date(Date.now());

    constructor(user: Object = {}) {
        Object.assign(this, user);
    }

    public getJsonUser(): object {
        return {};
    }
}
