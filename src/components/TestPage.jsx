import React, { useEffect, useState } from "react";
import "../App.css";
import QuizQuestion from "../components/QuizQuestion";
import { useNavigate } from "react-router-dom";
import "./TestPage.css";

function TestPage({content_file, title, url, instructions, pageid}) {
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/content/quizzes/${content_file}`)
      .then((response) => response.json())
      .then((data) => setQuizData(data.questions))
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, [content_file]);

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

  const handleSubmit = () => {
    console.log("Passing Selected Answers:", selectedAnswers); // Debug log
    navigate(`/tests/${url}/results`, { state: selectedAnswers });
  }

  return (
    <div id={`${pageid}`} className="page test-page">
      <header className="hero">
        <h1>{title}</h1>
      </header>
      <main>
        <p>{instructions}</p>
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
        <button id="submit_quiz" className="button" onClick={handleSubmit}>
          Submit
        </button>
      </main>
    </div>
  );
}

export default TestPage;