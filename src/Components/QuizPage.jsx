import React from 'react';

export default function QuizPage(props) {
  return (
    <div className='quiz'>
      <h2 className='quiz-question'>{props.question}</h2>
      <div className='answers'>
        {props.answers.map((answer) => {
          function myColor() {
            if (answer.isClicked) {
              return "linear-gradient(45deg, rgba(140,80,191,0.97) 0%, rgba(35,162,204,1) 100%)";
              
            } else if (props.results && answer.isCorrect) {
              return 'linear-gradient(45deg, rgba(80,191,183,0.97) 0%, rgba(35,204,98,1) 100%)';
            } else {
              return 'linear-gradient(45deg, rgba(225,238,235,0.97) 0%, rgba(194,209,200,1) 100%)';
            }
          }

          function myOpacity() {
            if (answer.isClicked) {
              return 1;
            } else if (props.results && answer.isCorrect) {
              return 1;
            } else if (!answer.isClicked) {
              return 0.75;
            } else {
              return 1;
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
          function myFontColor() {
            if (answer.isClicked) {
              return '#ffffff';
            } else if (props.results && answer.isCorrect) {
              return '#000000';
            } else {
              return '#000000';
            }
          }

          const styles = {
            backgroundImage: myColor(),
            opacity: myOpacity(),
            scale: myScale(),
            color: myFontColor(),
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
