import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

export interface IResultComponentProps {
    correctAnswers: number;
    numberOfQuestions: number;
}

export default class ResultComponent extends React.PureComponent<IResultComponentProps> {
    public render() {
        const { correctAnswers, numberOfQuestions } = this.props;
        return (
            <div>
                {`Result: ${correctAnswers}/${numberOfQuestions}`}
            </div>
        );
    }
}
