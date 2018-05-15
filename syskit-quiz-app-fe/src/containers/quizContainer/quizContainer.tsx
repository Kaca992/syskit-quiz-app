import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { IQuestion, IParticipantAnswers } from 'common/data';
import { getQuestions } from '../../service/questions.service';
import QuizComponent from 'components/quizComponent/quizComponent';
import _ = require('lodash');

export interface IQuizContainerProps {
    submitAnswers(answers: IParticipantAnswers[]): void;
}

export interface IQuizContainerState {
    questionIndex: number;
    questions: IQuestion[];
    answers: IParticipantAnswers[];
}

export default class QuizContainer extends React.Component<IQuizContainerProps, IQuizContainerState> {
    constructor(props: IQuizContainerProps) {
        super(props);
        this.state = {
            questionIndex: 0,
            questions: [],
            answers: []
        };
    }

    public componentDidMount() {
        return getQuestions().then(questions => {
            this.setState({
                questions
            });
        });
    }

    public render() {
        const { questions, questionIndex } = this.state;
        if (!questions || questions.length === 0) {
            return <div>Loading...</div>;
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
        const {questions, questionIndex, answers} = this.state;

        const newAnswers = _.cloneDeep(answers);
        const index = newAnswers.findIndex(x => x.questionId === idQuestion);

        if (index === -1) {
            newAnswers.push({questionId: idQuestion, answerId: idAnswer});
        } else {
            newAnswers[index].answerId = idAnswer;
        }

        // check if last question
        if (questionIndex === (questions.length - 1)) {
            this.props.submitAnswers(newAnswers);
        }

        this.setState({
            answers: newAnswers,
            questionIndex: questionIndex + 1
        });
    }
}
