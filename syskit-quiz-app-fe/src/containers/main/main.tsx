import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { SelectedPageEnum } from 'common/enum';
import ParticipantContainer from 'containers/participantContainer/participantContainer';
import QuizContainer from 'containers/quizContainer/quizContainer';
import { IParticipant, IParticipantAnswers } from 'common/data';

export interface IMainProps {

}

export interface IMainState {
    selectedPage: SelectedPageEnum;
    participantInfo: IParticipant;
    participantAnswers: IParticipantAnswers[];
}

export default class Main extends React.Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);
        this.state = {
            selectedPage: SelectedPageEnum.InfoEntry,
            participantInfo: null,
            participantAnswers: null
        };
    }

    public render() {
        switch (this.state.selectedPage) {
            case SelectedPageEnum.InfoEntry:
                return <ParticipantContainer onStartQuizClicked={this._onStartQuiz} />;
            case SelectedPageEnum.Questions:
                return <QuizContainer onSubmitAnswers={this._onSubmitAnswers} />;
        }
    }

    @autobind
    private _onStartQuiz(participantInfo: IParticipant) {
        this.setState({
            participantInfo,
            selectedPage: SelectedPageEnum.Questions
        });
    }

    // submit answers, start loading while results being calculated
    @autobind
    private _onSubmitAnswers(answers: IParticipantAnswers[]) {
        this.setState({
            participantAnswers: answers
        });
    }
}
