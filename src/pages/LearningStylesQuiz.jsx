import { useState, useEffect } from "react";
import "../App.css";
import QuizQuestion from "../components/QuizQuestion";
import "./LearningStylesQuiz.css";
import { Link } from "react-router-dom";

function LearningStylesQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  useEffect(() => {
    fetch("/content/learningstylesQuiz.json")
      .then((response) => response.json())
      .then((data) => setQuizData(data.learningstyles))
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  const handleAnswerSelected = (questionNumber, answerIndex) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [questionNumber]: answerIndex,
      };
      console.log("Updated Selected Answers:", updatedAnswers); // Debug log
      return updatedAnswers;
    });
  };

  return (
    <div id="learning_styles_quiz" className="page">
      <header className="hero">
        <h1>Discover your learning style!</h1>
      </header>
      <main>
        <p>Read each statement carefully and choose the option that best describes you.</p>
        <ul id="styles_question_list">
          {quizData.map((quizItem, index) => (
            <li key={index}>
              <QuizQuestion
                number={index + 1}
                question={quizItem.question}
                answers={quizItem.answers}
                onAnswerSelected={(answerIndex) =>
                  handleAnswerSelected(index + 1, answerIndex)
                }
              />
            </li>
          ))}
        </ul>
        <Link
          to={{
            pathname: "/tests/learning-styles/results",
            state: { selectedAnswers },
          }}
          onClick={() => console.log("Passing Selected Answers:", selectedAnswers)} // Debug log
        >
          <button id="submit_quiz" className="button">Submit</button>
        </Link>
      </main>
    </div>
  );
}

export default LearningStylesQuiz;