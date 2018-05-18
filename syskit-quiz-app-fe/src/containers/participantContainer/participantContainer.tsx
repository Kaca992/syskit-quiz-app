import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { ParticipantInfoInput } from 'common/strings';
import ParticipantInfo, { IParticipantValidation } from 'components/participantInfo/participantInfo';
import { IParticipant } from 'common/data';
import { emptyAndNonWhitespaceInput, emailFormValidation } from '../../utils/validation';

export interface IParticipantContainerProps {
    onStartQuizClicked(participantInfo: IParticipant): void;
}

export interface IParticipantContainerState {
    participantInfo: IParticipant;
    validation: IParticipantValidation;
}

export default class ParticipantContainer extends React.Component<IParticipantContainerProps, IParticipantContainerState> {
    constructor(props: IParticipantContainerProps) {
        super(props);
        this.state = {
            participantInfo: {},
            validation: {}
        };
    }

    public render() {
        return <ParticipantInfo
            participantInfo={this.state.participantInfo}
            validation={this.state.validation}
            onParticipantInfoChanged={this._onParticipantInfoChanged}
            onStartQuizClicked={this._onStartQuizClicked}
        />;
    }

    @autobind
    private _onParticipantInfoChanged(newInfo: IParticipant) {
        this.setState({
            participantInfo: newInfo
        });
    }

    @autobind
    private _onStartQuizClicked() {
        if (this._validate(this.state.participantInfo)) {
            this.props.onStartQuizClicked(this.state.participantInfo);
        }
    }

    // TODO: implement
    @autobind
    private _validate(participantInfo: IParticipant) {
        const validation: IParticipantValidation = {};

        validation.nameError = emptyAndNonWhitespaceInput(participantInfo.name);
        validation.emailError = emailFormValidation(participantInfo.email);
        validation.courseError = emptyAndNonWhitespaceInput(participantInfo.course);
        validation.yearError = emptyAndNonWhitespaceInput(participantInfo.enrollmentYear);

        this.setState({
            validation
        });

        return !validation.nameError && !validation.emailError && !validation.yearError && !validation.courseError;
    }
}
