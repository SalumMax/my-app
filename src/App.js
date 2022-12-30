import { useState, useEffect } from 'react';
import Main from './Components/Main';
import StartGameButton from './Components/Buttons/Button';
import QuizPage from './Components/QuizPage';
import QuizList from './Components/QuizList';
import Count from './Components/Count';
import PlayAgain from './Components/Buttons/PlayAgainButton';
import ShowResults from './Components/Buttons/ShowResultsButton';
import categoryList from './Components/QuizCategoriesList';
import { nanoid } from 'nanoid';

export default function App() {
  const [start, setStart] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState(9);
  const [quizNumber, setQuizNumber] = useState(5);
  const [results, setResults] = useState(false);
  const quizOptions = categoryList.trivia_categories;
  const api = `https://opentdb.com/api.php?amount=${quizNumber}&category=${category}&difficulty=medium&type=multiple`;

  function startQuiz() {
    setStart((prevState) => !prevState);
  }

  function SelectCategory(e) {
    const value = e.target.value;
    setCategory(value);
  }
  function selectQuizNumber(e) {
    const value = e.target.value;
    setQuizNumber(value);
  }

  useEffect(() => {
    function normalise(str) {
      return str
        .replace(/(&quot;)/g, '"')
        .replace(/(&rdquo;)/g, '"')
        .replace(/(&ldquo;)/g, '"')
        .replace(/(&#039;)/g, "'")
        .replace(/(&amp;)/g, '&');
    }
    fetch(api)
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((quiz) => {
            return {
              id: nanoid(),
              question: normalise(quiz.question),
              answers: [
                {
                  id: nanoid(),
                  answer: normalise(quiz.correct_answer),
                  isCorrect: true,
                  isClicked: false,
                },
                {
                  id: nanoid(),
                  answer: normalise(quiz.incorrect_answers[0]),
                  isCorrect: false,
                  isClicked: false,
                },
                {
                  id: nanoid(),
                  answer: normalise(quiz.incorrect_answers[1]),
                  isCorrect: false,
                  isClicked: false,
                },
                {
                  id: nanoid(),
                  answer: normalise(quiz.incorrect_answers[2]),
                  isCorrect: false,
                  isClicked: false,
                },
              ].sort(() => Math.random() - 0.5),
            };
          })
        )
      );
  }, [api]);

  function selectAnswer(quizId, optionId) {
    setQuizData((prevQuiz) =>
      prevQuiz.map((quiz) => {
        if (quizId !== quiz.id) {
          return quiz;
        } else {
          return {
            ...quiz,
            answers: quiz.answers.map((option) => {
              return option.id === optionId
                ? { ...option, isClicked: !option.isClicked }
                : { ...option, isClicked: false };
            }),
          };
        }
      })
    );
  }

  function countResults() {
    const isSelectedArr = [];
    quizData.map((element) =>
      element.answerOption.forEach((option) => {
        if (option.isSelected && option.isCorrect) {
          isSelectedArr.push(option);
        }
        setCount(isSelectedArr.length);
        setResults(true);
      })
    );
  }

  function playAgain() {
    window.location.reload(false);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const questions = quizData.map((element) => {
    const id = element.answers.map((option) => option.id);
    const isClicked = element.answers.map((option) => option.isClicked);
    return (
      <QuizPage
        key={id}
        id={id}
        question={element.question}
        answers={element.answers}
        isClicked={isClicked}
        selectAnswer={(id) => selectAnswer(element.id, id)}
      />
    );
  });

  return (
    <div className='App'>
      {!start && <Main selectQuizNumber={selectQuizNumber} />}
      {!start && (
        <QuizList selectCategory={SelectCategory} quizOptions={quizOptions} />
      )}
      {!start && <StartGameButton startQuiz={startQuiz} start='Start Quiz' />}
      {start && questions}
      {start && !results && <ShowResults countResults={countResults} />}
      {start && results && <PlayAgain startQuiz={playAgain} />}
      {start && results && (
        <Count countAnswers={count} countLength={quizData.length} />
      )}
    </div>
  );
}
