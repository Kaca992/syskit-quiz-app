import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

export interface IParticipantContainerProps {

}

export interface IParticipantContainerState {

}

export default class ParticipantContainer extends React.Component<IParticipantContainerProps, IParticipantContainerState> {
    constructor(props: IParticipantContainerProps) {
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
