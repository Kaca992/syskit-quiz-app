import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import './resultComponent.scss';

export interface IResultComponentProps {
    correctAnswers: number;
    numberOfQuestions: number;
}

export default class ResultComponent extends React.PureComponent<IResultComponentProps> {
    public render() {
        const { correctAnswers, numberOfQuestions } = this.props;
        return (
            <div className="result-container">
                <div className="elements-container">
                    <div className="leftWing-icon" />
                    <div className="result">
                        {`Result: ${correctAnswers}/${numberOfQuestions}`}
                    </div>
                    <div className="rightWing-icon" />
                </div>
            </div>
        );
    }
}
