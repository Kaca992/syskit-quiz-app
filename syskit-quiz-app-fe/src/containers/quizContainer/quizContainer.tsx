import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { IQuestion, IParticipantAnswers } from 'common/data';
import QuizComponent from 'components/quizComponent/quizComponent';
import cloneDeep = require('lodash/cloneDeep');
import { LoadingComponent } from 'components/loadingComponent/loadingComponent';
import { fetchingQuestions } from 'common/strings';

export interface IQuizContainerProps {
    questions: IQuestion[];
    onSubmitAnswers(answers: IParticipantAnswers[]): void;
}

export interface IQuizContainerState {
    questionIndex: number;
    answers: IParticipantAnswers[];
}

export default class QuizContainer extends React.Component<IQuizContainerProps, IQuizContainerState> {
    constructor(props: IQuizContainerProps) {
        super(props);
        this.state = {
            questionIndex: 0,
            answers: []
        };
    }

    public render() {
        const { questionIndex } = this.state;
        const { questions } = this.props;
        if (!questions || questions.length === 0) {
            return <LoadingComponent text={fetchingQuestions} />;
        }

        return <QuizComponent
            key={questionIndex}
            question={questions[questionIndex]}
            questionIndex={questionIndex}
            totalQuestions={questions.length}
            onAnswerSelected={this._onAnswerSelected}
        />;
    }

    @autobind
    private _onAnswerSelected(idQuestion: number, idAnswer: number) {
        const { questionIndex, answers } = this.state;
        const { questions } = this.props;

        const newAnswers = cloneDeep(answers);
        const index = newAnswers.findIndex(x => x.questionId === idQuestion);

        if (index === -1) {
            newAnswers.push({ questionId: idQuestion, answerId: idAnswer });
        } else {
            newAnswers[index].answerId = idAnswer;
        }

        // check if last question
        if (questionIndex === (questions.length - 1)) {
            this.props.onSubmitAnswers(newAnswers);
            return;
        }

        this.setState({
            answers: newAnswers,
            questionIndex: questionIndex + 1
        });
    }
}
