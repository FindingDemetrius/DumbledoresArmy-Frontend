import { Genre } from './Genre';

export class Question {

    private questionId: number
    private challengeId: number
    private question: string
    private options: string[]
    private genre: Genre
}