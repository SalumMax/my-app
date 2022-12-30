import React from 'react';

export default function ShowResults(props) {
  return (
    <div>
      <button className='btn' onClick={props.countResults}>
        Show Results
      </button>
    </div>
  );
}
