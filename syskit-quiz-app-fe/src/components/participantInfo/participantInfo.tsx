import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { TextField, Button } from 'quick-react-ts';
import { IParticipant } from 'common/data';
import { ParticipantInfoInput } from 'common/strings';

import './participantInfo.scss';
import logo from '../../assets/logo.png';

export interface IParticipantInfoProps {
    participantInfo: IParticipant;
    onParticipantInfoChanged(newInof: IParticipant): void;
    onStartQuizClicked(): void;
}

export default class ParticipantInfo extends React.PureComponent<IParticipantInfoProps> {
    public render() {
        const { name, email, course, enrollmentYear } = this.props.participantInfo;
        const hasValueClassName = "has-value";

        return (
            <div className="participant-info-container">
                <div className="logo-icon">
                    <img src={logo} />
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
                    <div className="course-container">
                        <div className="course-input">
                            <TextField
                                className={course ? hasValueClassName : null}
                                label={ParticipantInfoInput.courseLabel}
                                placeholder={ParticipantInfoInput.courseLabel}
                                onChanged={this._onCourseChanged}
                                value={course}
                                underlined
                            />
                        </div>
                        <div className="enrollment-year-input">
                            <TextField
                                className={enrollmentYear ? hasValueClassName : null}
                                label={ParticipantInfoInput.enrollmentYearLabel}
                                placeholder={ParticipantInfoInput.enrollmentYearLabel}
                                onChanged={this._onEnrollYearChanged}
                                value={enrollmentYear}
                                underlined
                                type="number"
                            />
                        </div>
                    </div>
                    <Button
                        className='button-primary button-quiz'
                        onClick={this.props.onStartQuizClicked}>
                        {ParticipantInfoInput.startQuiz}
                    </Button>
                </div>
            </div>
        );
    }

    @autobind
    private _onNameChanged(name: string) {
        const { onParticipantInfoChanged, participantInfo } = this.props;
        onParticipantInfoChanged({ ...participantInfo, name });
    }

    @autobind
    private _onEmailChanged(email: string) {
        const { onParticipantInfoChanged, participantInfo } = this.props;
        onParticipantInfoChanged({ ...participantInfo, email });
    }

    @autobind
    private _onCourseChanged(course: string) {
        const { onParticipantInfoChanged, participantInfo } = this.props;
        onParticipantInfoChanged({ ...participantInfo, course });
    }

    @autobind
    private _onEnrollYearChanged(enrollmentYear: string) {
        const { onParticipantInfoChanged, participantInfo } = this.props;
        onParticipantInfoChanged({ ...participantInfo, enrollmentYear });
    }
}
