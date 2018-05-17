import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { TextField } from 'quick-react-ts';
import { IParticipant } from 'common/data';
import { ParticipantInfoInput } from 'common/strings';

import './participantInfo.scss';

export interface IParticipantInfoProps {
    participantInfo: IParticipant;
    onParticipantInfoChanged(newInof: IParticipant);
}

export default class ParticipantInfo extends React.PureComponent<IParticipantInfoProps> {
    public render() {
        const { name, email } = this.props.participantInfo;
        const hasValueClassName = "has-value";

        return (
            <div className="participant-info-container">
                <div className="logo-icon">
                    Logo
                </div>
                <div className="input-container">
                    <TextField
                        className={name ? hasValueClassName : null}
                        label={ParticipantInfoInput.nameLabel}
                        placeholder={ParticipantInfoInput.nameLabel}
                        onChanged={this._onNameChanged}
                        value={name}
                        underlined
                    />
                    <TextField
                        className={email ? hasValueClassName : null}
                        label={ParticipantInfoInput.emailLabel}
                        placeholder={ParticipantInfoInput.emailLabel}
                        onChanged={this._onEmailChanged}
                        value={email}
                        underlined
                    />
                </div>
            </div>
        );
    }

    @autobind
    private _onNameChanged(name: string) {
        const {onParticipantInfoChanged, participantInfo} = this.props;
        onParticipantInfoChanged({...participantInfo, name});
    }

    @autobind
    private _onEmailChanged(email: string) {
        const {onParticipantInfoChanged, participantInfo} = this.props;
        onParticipantInfoChanged({...participantInfo, email});
    }
}