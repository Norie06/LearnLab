import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

function LearningStylesResults(results) {
  const {answers} = useParams();
  const parsedAnswers = JSON.parse(answers);

  return (
    <div>
      <h1>Learning Styles Test Results</h1>
      <h2>Understanding Your Learning Style</h2>
      <p>Many people have a mix of learning styles! Use this quiz to identify your strengths and combine techniques for a more effective study experience. Try incorporating strategies from other learning styles to see what works best for you.
      For more tips and tools tailored to your learning style, visit the LearnLab <a href='/resource-hub'>Resource Hub</a>.</p>
      <div id='learning_styles_result'>
        <ReactMarkdown>
          {results}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default LearningStylesResults;