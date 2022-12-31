import React from 'react';

function Main(props) {
  return (
    <div className='quiz'>
      <h1>QUIZZICAL</h1>
      <select id='quiz-numbers' onChange={props.selectQuizNumber}>
        <option disabled selected>
          {' '}
          Select number of questions{' '}
        </option>
        <option value='5'> 5 </option>
        <option value='6'> 6 </option>
        <option value='7'> 7 </option>
        <option value='8'> 8 </option>
        <option value='9'> 9 </option>
        <option value='10'> 10 </option>
      </select>
    </div>
  );
}

export default Main;
