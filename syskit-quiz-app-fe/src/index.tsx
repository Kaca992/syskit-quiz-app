import * as React from 'react';
import * as ReactDOM from 'react-dom';

import QuizComponent, { IQuestion } from 'components/quizComponent/quizComponent';

import './style/index.scss';

const mockQuestion: IQuestion = {
  id: 1,
  questionText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  answers: [
    {id: 1, answerText: "Lorem Ipsum is simply dummy text"},
    {id: 2, answerText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"},
    {id: 3, answerText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"},
    {id: 4, answerText: `1500s
    typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500skalčskdadsklaksdl aslkdlaksd
    ovo je test jako dugogo pitanja asdadasd`}
  ]
};

ReactDOM.render(
  <QuizComponent question={mockQuestion} totalQuestions={14} questionIndex={3} onAnswerSelected={() => null} />,
  document.getElementById('root'),
);
