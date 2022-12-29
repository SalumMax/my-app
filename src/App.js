import { useState, useEffect } from 'react';
import Main from './Components/Main';
import Button from './Components/Button';
import QuizPage from './Components/QuizPage';
import QApairs from './Components/QApairs';

function App() {
  const [start, setStart] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const api =
    'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple';

  function startQuiz() {
    setStart((prevState) => !prevState);
  }

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((quiz) => {
            return {
              question: quiz.question,
              isClicked: false,
              isCorrect: false,
              answers: [
                quiz.correct_answer,
                quiz.incorrect_answers[0],
                quiz.incorrect_answers[1],
                quiz.incorrect_answers[2],
              ].sort(() => Math.random() - 0.5),
            };
          })
        )
      );
  }, []);

  console.log(quizData);

  const questions = quizData.map((element) => {
    return <QApairs question={element.question} answers={element.answers} />;
  });

  return (
    <div className='App'>
      {!start && <Main />}
      {!start && <Button startQuiz={startQuiz} start='Start Quiz' />}
      {start && questions}
    </div>
  );
}

export default App;
