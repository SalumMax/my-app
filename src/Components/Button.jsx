import React from 'react';

function Button(props) {
  return (
    <button onClick={props.startQuiz} className='btn'>
      {props.start}
    </button>
  );
}

export default Button;
