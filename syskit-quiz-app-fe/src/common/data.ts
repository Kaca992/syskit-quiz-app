export interface IQuestion {
    id: number;
    questionText: string;
    answers: IQuestionAnswer[];
}

export interface IQuestionAnswer {
    id: number;
    answerText: string;
}

export interface IParticipant {
    name?: string;
    email?: string;
    course?: string;
    enrollmentYear?: string;
    result?: number;
}

export interface IParticipantAnswers {
    questionId: number;
    answerId?: number;
}

export interface ITest {
    participant: IParticipant;
    answers: IParticipantAnswers[];
}