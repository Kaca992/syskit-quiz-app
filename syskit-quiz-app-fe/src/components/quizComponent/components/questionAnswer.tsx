import * as React from 'react';
import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

export interface IQuestionAnswerProps {
    id: number;
    answerText: string;

    isSelected?: boolean;

    onClick(id: number): void;
    onAccept(id: number): void;
}

export default class QuestionAnswer extends React.PureComponent<IQuestionAnswerProps> {
    public render() {
        const className = classNames("question-answer", {
            selected: this.props.isSelected
        });
        return <div className={className} onClick={this._onClick}>
            <div>
                {this.props.answerText}
            </div>
            {this.props.isSelected &&
                <div className="answer-confirmation_container">
                    <span className="confirmation-button" onClick={this._onAccept}>Accept</span>
                </div>
            }
        </div>;
    }

    @autobind
    private _onClick() {
        this.props.onClick(this.props.id);
    }

    @autobind
    private _onAccept() {
        this.props.onAccept(this.props.id);
    }
}
