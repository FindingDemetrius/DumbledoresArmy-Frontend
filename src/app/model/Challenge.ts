import { Question } from './Question';

export class Challenge {
    
    private questionList: Question[]
    private completed: boolean
    private location: Location
    private creatorId: number

    editQuestion(questionId: number) {
        //edit question from questionList if creatorID = userID
    }

    deleteQuestion(questionId: number) {
        //delete question from questionList if creatorID = userID
    }

    createQuestion(question: Question) {
        //add question to questionList if creatorID = userID
    }
    
}