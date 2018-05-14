import * as React from 'react';

import './progressBar.scss';

export interface IProgressBarProps {
    percentage: number;
}

export const ProgressBar: React.SFC<IProgressBarProps> = (props) => {
    return <div className="progress-bar">
        <div style={{width: `${props.percentage * 100}%`}} />
    </div>;
};
