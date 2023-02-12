import { useState, useEffect } from 'react';
import Main from './Components/Main';
import StartGameButton from './Components/Buttons/Button';
import QuizPage from './Components/QuizPage';
import QuizList from './Components/QuizList';
import Count from './Components/Count';
import PlayAgain from './Components/Buttons/PlayAgainButton';
import ShowResults from './Components/Buttons/ShowResultsButton';
import categoryList from './Components/QuizCategoriesList';
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
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

  // start quiz
  function startQuiz() {
    setStart((prevState) => !prevState);
  }
  //selecting category of the quiz
  // function selectCategory(e) {
  //   const value = e.target.value;
  //   setCategory(value);
  // }

  //selecting number of questions in the quiz
  function selectQuizNumber(e) {
    const value = e.target.value;
    setQuizNumber(value);
  }

  //fetching quiz data from the API and putting it in the state in the required format
  useEffect(() => {
    // fixing encoding issues in the fetched data
    function normalise(str) {
      return str
        .replace(/(&quot;)/g, '"')
        .replace(/(&rdquo;)/g, '"')
        .replace(/(&ldquo;)/g, '"')
        .replace(/(&#039;)/g, "'")
        .replace(/(&amp;)/g, '&')
        .replace(/(&gt;)/g, '>')
        .replace(/(&lt;)/g, '<');
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
      element.answers.forEach((option) => {
        if (option.isClicked && option.isCorrect) {
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
        results={results}
        selectAnswer={(id) => selectAnswer(element.id, id)}
      />
    );
  });

  return (
    <div className='App'>
      {!start && <Main selectQuizNumber={selectQuizNumber} />}
      {!start && (
        <QuizList
          selectCategory={(e) => setCategory(e.target.value)}
          quizOptions={quizOptions}
        />
      )}
      {!start && <StartGameButton startQuiz={startQuiz} start='Start Quiz' />}
      {start && questions}
      {start && !results && <ShowResults countResults={countResults} />}
      {start && results && (
        <Count countAnswers={count} countLength={quizData.length} />
      )}
      {/* launch confetti if num of correct questions  === num of quiz questions */}
       {count <= quizData.length && count !== 0 && <Confetti/>} 
      {start && results && <PlayAgain startQuiz={playAgain} />}
    </div>
  );
}
