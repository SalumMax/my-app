import React from 'react';

export default function Count(props) {
  return (
    <div>
      <h3 className='quiz-results'>
        Correct answers: {props.countAnswers} of {props.countLength}
      </h3>
    </div>
  );
}
