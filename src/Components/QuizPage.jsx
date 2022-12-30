import React from 'react';

export default function QuizPage(props) {
  return (
    <div className='quiz'>
      <h3 className='quiz-question'>{props.question}</h3>
      <div className='answers'>
        {props.answers.map((answer) => {
          function myColor() {
            if (answer.isClicked) {
              return '#CBC3E3';
            } else if (props.results && answer.isCorrect) {
              return '#90EE90';
            } else {
              return 'white';
            }
          }

          function myOpacity() {
            if (answer.isClicked) {
              return 1;
            } else if (props.results && answer.isCorrect) {
              return 1;
            } else {
              return 0.75;
            }
          }

          function myScale() {
            if (answer.isClicked) {
              return 0.8;
            } else if (props.results && answer.isCorrect) {
              return 1;
            } else {
              return 1;
            }
          }

          const styles = {
            backgroundColor: myColor(),
            opacity: myOpacity(),
            scale: myScale(),
          };
          return (
            <p
              style={styles}
              className='quiz-answer'
              onClick={() => props.selectAnswer(answer.id)}
            >
              {answer.answer}
            </p>
          );
        })}
      </div>
    </div>
  );
}
