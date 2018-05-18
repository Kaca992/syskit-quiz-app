import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { SelectedPageEnum } from 'common/enum';
import ParticipantContainer from 'containers/participantContainer/participantContainer';
import QuizContainer from 'containers/quizContainer/quizContainer';
import { IParticipant, IParticipantAnswers, IParticipantResult } from 'common/data';
import { addParticipant } from '../../service/participant.service';
import ResultComponent from 'components/resultComponent/resultComponent';
import { LoadingComponent } from 'components/loadingComponent/loadingComponent';
import { submitingResults } from 'common/strings';

export interface IMainProps {

}

export interface IMainState {
    selectedPage: SelectedPageEnum;
    participantInfo: IParticipant;
    participantResult: IParticipantResult;
    loadingText?: string;
}

export default class Main extends React.Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);
        this.state = {
            selectedPage: SelectedPageEnum.InfoEntry,
            participantInfo: null,
            participantResult: null
        };
    }

    public render() {
        switch (this.state.selectedPage) {
            case SelectedPageEnum.InfoEntry:
                return <ParticipantContainer onStartQuizClicked={this._onStartQuiz} />;
            case SelectedPageEnum.Questions:
                return <QuizContainer onLoadError={this._onError} onSubmitAnswers={this._onSubmitAnswers} />;
            case SelectedPageEnum.Result:
                const { correctAnswers, numberOfQuestions } = this.state.participantResult;
                return <ResultComponent correctAnswers={correctAnswers} numberOfQuestions={numberOfQuestions} />;
            case SelectedPageEnum.Loading:
                return <LoadingComponent text={this.state.loadingText} />;
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
            selectedPage: SelectedPageEnum.Loading,
            loadingText: submitingResults
        });

        addParticipant(this.state.participantInfo, answers).then(result => {
            this.setState({
                selectedPage: SelectedPageEnum.Result,
                participantResult: result
            });
        }).catch(error => {
            this._onError(error);
        });
    }

    @autobind
    private _onError(error: any) {
        this.setState({
            selectedPage: SelectedPageEnum.Error
        });
    }
}
