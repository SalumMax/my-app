import React from 'react';

export default function PlayAgain(props) {
  return (
    <div>
      <button className='button' onClick={props.startQuiz}>
        Play Again
      </button>
    </div>
  );
}
