export class User {
  userName = "";
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
      userName: this.userName,
      name: this.name,
      dateOfBirth: this.dateOfBirth,
      emailAddress: this.emailAddress,
      profileImageUrl: this.profileImageUrl
    };
    return JSON.parse(JSON.stringify(returnDict));
  }
}
