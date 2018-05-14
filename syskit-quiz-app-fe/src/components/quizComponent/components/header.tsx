import * as React from 'react';

export interface IHeaderProps {
    questionIndex: number;
    totalQuestions: number;
    questionText: string;
}

export const Header: React.SFC<IHeaderProps> = (props) => {
    const {questionIndex, questionText, totalQuestions} = props;

    return <div className="question-header">
        <div className="question-header_index">{`${questionIndex}/${totalQuestions}`}</div>
        <div className="question-header_text">
            {questionText}
        </div>
    </div>;
};
