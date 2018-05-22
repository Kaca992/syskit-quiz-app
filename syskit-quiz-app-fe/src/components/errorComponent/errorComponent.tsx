import * as React from 'react';

import './errorComponent.scss';

export interface IErrorComponentProps {
    exceptionMessage: string;
}

export const ErrorComponent: React.SFC<IErrorComponentProps> = (props) => {
    return <div className="error-container">
        {props.exceptionMessage}
    </div>;
};
