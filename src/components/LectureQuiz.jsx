import React from 'react';
import { useParams } from 'react-router-dom';
import TestPage from './TestPage';
import "../App.css";
import "./TestPage.css";

function LectureQuiz() {
  const { videoId } = useParams();
  
  return (
    <TestPage
      content_file={`lecture${videoId}Quiz.json`}
      title={`Lecture ${videoId}: Test`}
      url={`pretend-lecture/${videoId}`}
      instructions="Please answer the questions to the best of your ability. Good luck!"
      pageid={`lecture${videoId}-test`}
    />
  );
}

export default LectureQuiz;