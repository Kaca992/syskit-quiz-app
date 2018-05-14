import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './style/index.scss';
import QuizContainer from 'containers/quizContainer/quizContainer';

ReactDOM.render(
  <QuizContainer submitAnswers={() => null} />,
  document.getElementById('root'),
);
