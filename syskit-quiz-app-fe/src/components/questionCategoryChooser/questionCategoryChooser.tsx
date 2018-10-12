import * as React from 'react';
import * as classNames from 'classnames';

import './questionCategoryChooser.scss';
import { IQuestionCategoryInfo } from 'common/data';
import { Button } from 'quick-react-ts';

export interface IQuestionCategoryChooserProps {
    categoryInfos: IQuestionCategoryInfo[];
    onCategorySelected(categoryId: number);
}

export interface IQuestionCategoryChooserState {

}

export default class QuestionCategoryChooser extends React.Component<IQuestionCategoryChooserProps, IQuestionCategoryChooserState> {
    constructor(props: IQuestionCategoryChooserProps) {
        super(props);

    }

    public render() {
        const { categoryInfos, onCategorySelected } = this.props;

        return (
            <div className="question-category-chooser">
                {categoryInfos.map(categoryInfo => {
                    return <div
                        key={categoryInfo.categoryId}
                        className='question-category-chooser__button'
                        onClick={() => onCategorySelected(categoryInfo.categoryId)}>
                        {categoryInfo.text}
                    </div>;
                })
            }
            </div>
        );
    }
}