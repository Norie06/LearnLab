import { useState, useEffect } from "react";
import "../App.css";
import QuizQuestion from "../components/QuizQuestion";
import "./LearningStylesQuiz.css"
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function NoteTaking() {
  const [quizData, setQuizData] = useState([]); // State to store the quiz data

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch("/content/noteTakingQuiz.json")
      .then((response) => response.json())
      .then((data) => setQuizData(data.noteTakingStyles))
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div id="learning_styles_quiz" className="page">
      <header className="hero">
        <h1>Discover your note-taking style!</h1>
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
              />
            </li>
          ))}
        </ul>
        <Link>
          <button id="submit_quiz" className="button">Submit</button>
        </Link>
      </main>
    </div>
  );
}

export default NoteTaking;