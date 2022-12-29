import React from 'react';

function QApairs(props) {
  return (
    <div className='quiz'>
      <h3 className='quiz-question'>{props.question}</h3>
      <div className='answers'>
        {props.answers.map((item) => {
          return <p className='quiz-answer'>{item}</p>;
        })}
      </div>
    </div>
  );
}

export default QApairs;
