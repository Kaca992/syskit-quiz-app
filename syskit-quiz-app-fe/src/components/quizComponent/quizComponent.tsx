import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import './quizComponent.scss';
import { Header } from './components/header';
import QuestionAnswer from './components/questionAnswer';
import { ProgressBar } from 'components/quizComponent/components/progressBar';
import { IQuestion } from 'common/data';

export interface IQuizComponentProps {
    question: IQuestion;
    questionIndex: number;
    totalQuestions: number;
    onAnswerSelected(idQuestion: number, idAnswer: number);
}

export interface IQuizComponentState {
    selectedAnswerId: number;
}

export default class QuizComponent extends React.Component<IQuizComponentProps, IQuizComponentState> {
    constructor(props: IQuizComponentProps) {
        super(props);
        this.state = {
            selectedAnswerId: -1
        };
    }

    public render() {
        const { question, questionIndex, totalQuestions } = this.props;
        const index = questionIndex + 1;

        return (
            <div className="question-container">
                <Header questionText={question.questionText}
                        questionIndex={index}
                        totalQuestions={totalQuestions} />
                <ProgressBar percentage={index / totalQuestions} />
                <div className="question-answers-container">
                    {question.answers.map(answer => {
                        return <QuestionAnswer
                            key={answer.id}
                            id={answer.id}
                            answerText={answer.answerText}
                            isSelected={this.state.selectedAnswerId === answer.id}
                            onClick={this._onAnswerClick}
                            onAccept={this._onAnswerAccept}
                        />;
                    })}
                </div>
            </div>
        );
    }

    @autobind
    private _onAnswerClick(answerId: number) {
        this.setState({selectedAnswerId: answerId});
    }

    @autobind
    private _onAnswerAccept(answerId: number) {
        this.props.onAnswerSelected(this.props.question.id, answerId);
    }
}
