import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { TextField } from 'quick-react-ts';
import { IParticipant } from 'common/data';
import { ParticipantInfoInput } from 'common/strings';

import './participantInfo.scss';

export interface IParticipantInfoProps extends IParticipant {
    onParticipantInfoChanged(newInof: IParticipant);
}

export default class ParticipantInfo extends React.PureComponent<IParticipantInfoProps> {
    public render() {
        return (
            <div className="participant-info-container">
                <div className="logo-icon">
                    Logo
                </div>
                <div className="input-container">
                    <TextField
                        placeholder={ParticipantInfoInput.nameLabel}
                        onChanged={this._onNameChanged}
                        underlined
                    />
                    <TextField
                        placeholder={ParticipantInfoInput.emailLabel}
                        onChanged={this._onEmailChanged}
                        underlined
                    />
                </div>
            </div>
        );
    }

    @autobind
    private _onNameChanged(name: string) {
        const {onParticipantInfoChanged, children, ...oldInfo} = this.props;
        onParticipantInfoChanged({...oldInfo, name});
    }

    @autobind
    private _onEmailChanged(email: string) {
        const {onParticipantInfoChanged, children, ...oldInfo} = this.props;
        onParticipantInfoChanged({...oldInfo, email});
    }
}
