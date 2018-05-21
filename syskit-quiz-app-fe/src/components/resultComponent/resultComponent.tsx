import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { prizeTreshold } from '../../assets/config.json';

import './resultComponent.scss';
import * as _ from 'lodash';

export interface IResultComponentProps {
    correctAnswers: number;
    numberOfQuestions: number;
}

export default class ResultComponent extends React.PureComponent<IResultComponentProps> {
    public render() {
        const { correctAnswers, numberOfQuestions } = this.props;
        const didWinPrize = correctAnswers >= prizeTreshold;
        const msg = didWinPrize ? "Dođite do našeg štanda po nagradu!" : "Hvala Vam na sudjelovanju!";

        return (
            <div className="final-screen-container">
                {didWinPrize && this._renderStars()}
                <div className="elements-container">
                    <div className="leftWing-icon" />
                    <div className="result-container">
                        <div className="congratulations">
                            Čestitamo!
                        </div>
                        <div className="result">
                            {`Rezultat: ${correctAnswers}/${numberOfQuestions}`}
                        </div>
                        {
                            <div className="message-container">
                                {msg}
                            </div>
                        }
                    </div>
                    <div className="rightWing-icon" />
                </div>
                <div className="logoResult-icon" />
            </div>
        );
    }

    private _renderStars() {
        return <div className="stars-container">
            {
                _.times(15, i => {
                    return <div className={`star-icon-${i}`} />;
                })
            }
        </div>;
    }
}
