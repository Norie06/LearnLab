import React from 'react';
import { useParams } from 'react-router-dom';
import TestPage from './TestPage';

function LectureQuiz() {
  const { videoId } = useParams();
  
  return (
    <TestPage
      content_file={`lecture${videoId}Quiz.json`}
      title={`Lecture ${videoId} Quiz`}
      url={`pretend-lecture/${videoId}`}
    />
  );
}

export default LectureQuiz;