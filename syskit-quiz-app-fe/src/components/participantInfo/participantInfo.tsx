import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { TextField, Button } from 'quick-react-ts';
import { IParticipant } from 'common/data';
import { ParticipantInfoInput } from 'common/strings';

import './participantInfo.scss';

export interface IParticipantValidation {
    nameError?: string;
    emailError?: string;
    courseError?: string;
    yearError?: string;
}

export interface IParticipantInfoProps {
    participantInfo: IParticipant;
    validation: IParticipantValidation;
    onParticipantInfoChanged(newInof: IParticipant): void;
    onStartQuizClicked(): void;
}

export default class ParticipantInfo extends React.PureComponent<IParticipantInfoProps> {
    public render() {
        const { name, email, course, enrollmentYear } = this.props.participantInfo;
        const { nameError, emailError, courseError, yearError } = this.props.validation;
        const hasValueClassName = "has-value";
        const isInvalidClassName = "is-invalid";

        return (
            <div className="participant-info-container">
                <div className="logo-icon" />
                <div className="input-container">
                    <TextField
                        className={classNames({
                            [hasValueClassName]: Boolean(name),
                            [isInvalidClassName]: Boolean(nameError)
                        })}
                        label={ParticipantInfoInput.nameLabel}
                        placeholder={ParticipantInfoInput.nameLabel}
                        onChanged={this._onNameChanged}
                        value={name}
                        underlined
                    />
                    <TextField
                        className={classNames({
                            [hasValueClassName]: Boolean(email),
                            [isInvalidClassName]: Boolean(emailError)
                        })}
                        label={ParticipantInfoInput.emailLabel}
                        placeholder={ParticipantInfoInput.emailLabel}
                        onChanged={this._onEmailChanged}
                        value={email}
                        underlined
                    />
                    <div className="course-container">
                        <div className="course-input">
                            <TextField
                                className={classNames({
                                    [hasValueClassName]: Boolean(course),
                                    [isInvalidClassName]: Boolean(courseError)
                                })}
                                label={ParticipantInfoInput.courseLabel}
                                placeholder={ParticipantInfoInput.courseLabel}
                                onChanged={this._onCourseChanged}
                                value={course}
                                underlined
                            />
                        </div>
                        <div className="enrollment-year-input">
                            <TextField
                                className={classNames({
                                    [hasValueClassName]: Boolean(enrollmentYear),
                                    [isInvalidClassName]: Boolean(yearError)
                                })}
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
