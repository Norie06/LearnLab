import { useState } from "react";
import "./QuizQuestion.css"

function QuizQuestion({ number, question, answers }) {
  const [chosenAnswer, setChosenAnswer] = useState(null); // Store the index of the chosen answer

  return (
    <div className="quiz-question">
      <h4>{number}. {question}</h4>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            <button
              onClick={() => setChosenAnswer(index)} // Set the chosen answer to the current index
            >
              {chosenAnswer === index && (
                <img src="/images/image-scribble-icon-svgrepo-com.svg" alt="Chosen Answer" /> // Show the image if this answer is chosen
              )}
            </button>
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizQuestion;