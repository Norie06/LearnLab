import "../App.css";
import TestPage from "../components/TestPage";

function LearningStylesQuiz() {
  return (
    <TestPage
      content_file="learningStylesQuiz.json"
      title="Discover your learning style!"
      url="learning-styles"
      instructions="Read each statement carefully and choose the option that best describes you."
      pageid="learning-styles-test"
    />
  );
}

export default LearningStylesQuiz;