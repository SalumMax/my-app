import { useState } from 'react';
import Main from './Components/Main';
import Button from './Components/Button';
import QuizPage from './Components/QuizPage';

function App() {
  const [start, setStart] = useState(false);

  function startQuiz() {
    setStart((prevState) => !prevState);
  }

  return (
    <div className='App'>
      {!start && <Main />}
      {!start && <Button startQuiz={startQuiz} start='Start Quiz' />}
      {start && <QuizPage />}
    </div>
  );
}

export default App;
