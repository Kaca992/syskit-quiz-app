import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

export interface IQuizContainerProps {

}

export interface IQuizContainerState {

}

export default class QuizContainer extends React.Component<IQuizContainerProps, IQuizContainerState> {
    constructor(props: IQuizContainerProps) {
        super(props);

    }

    public render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}
