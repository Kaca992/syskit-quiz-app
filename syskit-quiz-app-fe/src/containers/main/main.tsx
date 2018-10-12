import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { SelectedPageEnum } from 'common/enum';
import ParticipantContainer from 'containers/participantContainer/participantContainer';
import QuizContainer from 'containers/quizContainer/quizContainer';
import { IParticipant, IParticipantAnswers, IParticipantResult, IQuestion, IQuestionCategoryInfo } from 'common/data';
import { addParticipant } from '../../service/participant.service';
import ResultComponent from 'components/resultComponent/resultComponent';
import { LoadingComponent } from 'components/loadingComponent/loadingComponent';
import { submitingResults } from 'common/strings';
import { getQuestions } from '../../service/questions.service';
import { ErrorComponent } from 'components/errorComponent/errorComponent';
import { numberOfQuestions, categories } from '../../assets/config.json';
import QuestionCategoryChooser from 'components/questionCategoryChooser/questionCategoryChooser';

export interface IMainProps {

}

export interface IMainState {
    selectedPage: SelectedPageEnum;
    questionsByCategory: { [categoryId: string]: IQuestion[] };
    selectedCategory: number;
    participantInfo: IParticipant;
    participantResult: IParticipantResult;
    loadingText?: string;
    exceptionMessage?: string;
}

export default class Main extends React.Component<IMainProps, IMainState> {
    private categoryInfos: IQuestionCategoryInfo[] = [{
        categoryId: 1,
        text: "Programiranje"
    },
    {
        categoryId: 2,
        text: "Business"
    }];

    constructor(props: IMainProps) {
        super(props);
        this.state = {
            selectedPage: SelectedPageEnum.InfoEntry,
            selectedCategory: 1,
            questionsByCategory: {},
            participantInfo: null,
            participantResult: null
        };
    }

    public componentDidMount() {
        return getQuestions({ number: numberOfQuestions, categories }).then(questionsByCategory => {
            this.setState({ questionsByCategory });
        }).catch(error => {
            this._onError(error);
        });
    }

    public render() {
        switch (this.state.selectedPage) {
            case SelectedPageEnum.InfoEntry:
                return <ParticipantContainer onStartQuizClicked={this._onStartQuiz} />;
            case SelectedPageEnum.CategoryChooser:
                return <QuestionCategoryChooser categoryInfos={} />;
            case SelectedPageEnum.Questions:
                const questions = this.state.questionsByCategory[this.state.selectedCategory];
                return <QuizContainer questions={questions} onSubmitAnswers={this._onSubmitAnswers} />;
            case SelectedPageEnum.Result:
                const { correctAnswers } = this.state.participantResult;
                return <ResultComponent correctAnswers={correctAnswers} numberOfQuestions={numberOfQuestions} />;
            case SelectedPageEnum.Loading:
                return <LoadingComponent text={this.state.loadingText} />;
            case SelectedPageEnum.Error:
                return <ErrorComponent exceptionMessage={this.state.exceptionMessage} />;
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
            selectedPage: SelectedPageEnum.Error,
            exceptionMessage: error && error.body && error.body.Message
        });
    }
}
