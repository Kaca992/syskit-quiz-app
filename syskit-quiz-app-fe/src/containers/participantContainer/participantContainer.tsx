import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { ParticipantInfoInput } from 'common/strings';
import ParticipantInfo from 'components/participantInfo/participantInfo';
import { IParticipant } from 'common/data';

export interface IParticipantContainerProps {
    onStartQuizClicked(participantInfo: IParticipant): void;
}

export interface IParticipantContainerState {
    participantInfo: IParticipant;
}

export default class ParticipantContainer extends React.Component<IParticipantContainerProps, IParticipantContainerState> {
    constructor(props: IParticipantContainerProps) {
        super(props);
        this.state = {
            participantInfo: {}
        };
    }

    public render() {
        return <ParticipantInfo
            participantInfo={this.state.participantInfo}
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
        return true;
    }
}
