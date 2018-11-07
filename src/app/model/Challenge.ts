import { Question } from './Question';

interface Position {
    latitude: number
    longitude: number
}

interface Q {
    [id: number] : Question
}

export class Challenge {
    
    challengeName: string
    tags: string[]
    location: Position
    questions: Q
}