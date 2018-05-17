import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { ParticipantInfoInput } from 'common/strings';
import ParticipantInfo from 'components/participantInfo/participantInfo';
import { IParticipant } from 'common/data';

export interface IParticipantContainerProps {

}

export interface IParticipantContainerState {
    participantInfo: IParticipant;
}

export default class ParticipantContainer extends React.Component<IParticipantContainerProps, IParticipantContainerState> {
    constructor(props: IParticipantContainerProps) {
        super(props);
        this.state = {
            participantInfo: null
        };
    }

    public render() {
        return <ParticipantInfo onParticipantInfoChanged={this._onParticipantInfoChanged} />;
    }

    // validate
    @autobind
    private _onParticipantInfoChanged(newInfo: IParticipant) {
        this.setState({
            participantInfo: newInfo
        });
    }
}
