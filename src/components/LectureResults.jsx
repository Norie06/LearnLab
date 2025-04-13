import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown'; // Import the Markdown parser
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './LectureResults.css';
import '../App.css';

function LectureResults() {
  const { videoId } = useParams();
  const location = useLocation();
  const userAnswers = location.state; // Changed this line to directly use location.state
  const [quizData, setQuizData] = useState(null);
  const [evaluationContent, setEvaluationContent] = useState(''); // State for Markdown content

  useEffect(() => {
    console.log('Location state received:', location.state);
  }, [location.state]);

  const fetchQuizData = useMemo(() => {
    return fetch(`/content/quizzes/lecture${videoId}Quiz.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load quiz data');
        }
        return response.json();
      })
      .catch((error) => console.error(error));
  }, [videoId]);

  useEffect(() => {
    fetchQuizData
      .then((data) => setQuizData(data))
      .catch((error) => console.error(error));
  }, [fetchQuizData]);

  useEffect(() => {
    if (quizData && userAnswers) {
      const correctCount = quizData.questions.filter(
        (question, index) => question.correct_answer === userAnswers[index + 1]
      ).length;
      const percentage = Math.round((correctCount / quizData.questions.length) * 100);

      // Determine the Markdown file to load based on the percentage
      let evaluationFile = '';
      if (percentage >= 90) {
        evaluationFile = '/content/test-results/pretend-lecture/outstanding.md';
      } else if (percentage >= 70) {
        evaluationFile = '/content/test-results/pretend-lecture/great.md';
      } else if (percentage >= 50) {
        evaluationFile = '/content/test-results/pretend-lecture/not_bad.md';
      } else {
        evaluationFile = '/content/test-results/pretend-lecture/grow.md';
      }

      // Fetch the Markdown file
      fetch(evaluationFile)
        .then((response) => response.text())
        .then((content) => setEvaluationContent(content))
        .catch((error) => console.error('Failed to load evaluation content:', error));
    }
  }, [quizData, userAnswers]);

  return (
    <div className="page" id="lecture-results">
      <header className="hero">
        <h1>Lecture {videoId}: Test Results</h1>
      </header>
      <main>
        {!userAnswers ? (
          <div className="message-container">
            <p>No results to display. Please complete the quiz first.</p>
          </div>
        ) : !quizData ? (
          <div className="message-container">
            <p>Loading quiz data...</p>
          </div>
        ) : (
          <>
            <p className="percentage">
              {Math.round(
                (quizData.questions.filter(
                  (question, index) =>
                    question.correct_answer === userAnswers[index + 1]
                ).length /
                  quizData.questions.length) *
                  100
              )}
              % Correct
            </p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${Math.round(
                    (quizData.questions.filter(
                      (question, index) =>
                        question.correct_answer === userAnswers[index + 1]
                    ).length /
                      quizData.questions.length) *
                      100
                  )}%`,
                }}
              ></div>
            </div>

            {/* Verbal Evaluation Section */}
            <div className="evaluation-content">
              <ReactMarkdown>{evaluationContent}</ReactMarkdown>
            </div>

            <ul className="evaluations">
              {quizData.questions.map((question, index) => {
                const adjustedIndex = index + 1;
                const userAnswer = userAnswers[adjustedIndex];

                return (
                  <li
                    key={index}
                    className={`evaluation ${
                      userAnswer === question.correct_answer
                        ? 'correct'
                        : 'incorrect'
                    }`}
                  >
                    <div className="question-line">
                      {userAnswer === question.correct_answer ? (
                        <FontAwesomeIcon icon={faCheck} className="icon correct" />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} className="icon incorrect" />
                      )}
                      <h3>
                        <b>Question {index + 1}:</b> {question.question}
                      </h3>
                    </div>
                    <p>
                      <b>Your Answer:</b>{' '}
                      {question.answers[userAnswer] || 'No answer'}
                    </p>
                    <p>
                      <b>Correct Answer:</b>{' '}
                      {question.answers[question.correct_answer]}
                    </p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <Link to={'/tests/pretend-lecture'}>
          <button>
            Back to the Lectures
          </button>
        </Link>
      </main>
    </div>
  );
}

export default LectureResults;