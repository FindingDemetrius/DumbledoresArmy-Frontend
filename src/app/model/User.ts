export class User {
  username = "";
  name = "";
  dateOfBirth = new Date(Date.now()).toUTCString();
  emailAddress = "";
  profileImageUrl = "";
  totalScore;
  challengesPostedRef;
  challengesTakenRef;
  numberOfChallengesPosted;
  numberOfChallengesTaken;
  datePosted;
  dateModified;

  constructor(user: Object = {}) {
    Object.assign(this, user);
  }

  public getJsonUser(): object {
    const returnDict = {
      username: this.username,
      name: this.name,
      dateOfBirth: this.dateOfBirth,
      emailAddress: this.emailAddress,
      profileImageUrl: this.profileImageUrl
    };
    return JSON.parse(JSON.stringify(returnDict));
  }
}
