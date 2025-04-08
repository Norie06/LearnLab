import "../App.css";
import "./LearningStylesQuiz.css";
import TestPage from "../components/TestPage";

function LearningStylesQuiz() {
  return (
    <TestPage
      content_file="learningStylesQuiz.json"
      title="Discover your learning style!"
      url="learning-styles"
    />
  );
}

export default LearningStylesQuiz;