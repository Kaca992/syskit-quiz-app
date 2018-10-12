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
    isConsentGiven?: boolean;
}

export interface IParticipantAnswers {
    questionId: number;
    answerId?: number;
}

export interface ITest {
    categoryId: number;
    participant: IParticipant;
    answers: IParticipantAnswers[];
}

export interface IParticipantResult {
    correctAnswers: number;
    numberOfQuestions: number;
}

export interface IQuestionRequest {
    number: number;
    categories: number[];
}

export interface IQuestionCategoryInfo {
    categoryId: number;
    text: string;
}
