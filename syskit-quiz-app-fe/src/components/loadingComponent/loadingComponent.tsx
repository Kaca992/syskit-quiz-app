import * as React from 'react';
import { Spinner, SpinnerType } from 'quick-react-ts/lib';

import './loadingComponent.scss';

export interface ILoadingComponentProps {
    text?: string;
}

export const LoadingComponent: React.SFC<ILoadingComponentProps> = (props) => {
    return <div className="loading-container">
        <Spinner label={props.text} type={SpinnerType.large} />
    </div>;
};
