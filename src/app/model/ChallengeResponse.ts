import { Challenge } from './Challenge';

export class ChallengeResponse {

    numberOfQuestions: Number = 0;
    questionChoices: Number[] = [];
    score: Number = 0;
    challenge: Challenge = null;
    _challengeId: Number = 0;
    get challengeId() { return this._challengeId; }
    set challengeId(challengeId: Number) { this._challengeId = challengeId; }

    constructor(challengeResponse: object) {
        Object.assign(this, challengeResponse);
    }
}
