import React, { useEffect, useState } from 'react';
import ChooseQuizItem from '../components/ChooseQuizItem.jsx';
import './Home.css'; // Import the CSS file for Home component
import NoteTaking from './NoteTaking.jsx';
import LearningStyles from './LearningStyles.jsx';
import PretendLecture from './PretendLecture.jsx';
import BeginJourney from '../components/BeginJourney.jsx';
import TextBlockList from '../components/TextBlockList.jsx';

function Home() {
  const [intro, setIntro] = useState('');
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/content/homeIntroText.txt")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => setIntro(text))
      .catch(error => console.error('Error fetching intro text:', error));

    fetch("/content/homeFeatureDescriptions.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setFeatures(data.features))
      .catch(error => console.error('Error fetching feature descriptions:', error));
  }, []);

  return (
    <div>
      <header id="home_hero" className="App-header">
        <div id='home_hero_content' className='hero-content'>
          <h1>LearnLab</h1>
          <p>{intro}</p>
        </div>
      </header>
      <div id="home_content" className="Horizontal-list">
        <TextBlockList heading={"Learn Lab Features"} subheading={"You can expect to see here:"} topic={"features"} json={features} />
        <BeginJourney />
        <div id='home_choose_quiz' className='choose-quiz'>
          <ChooseQuizItem title="Learning Styles Quiz" image="/images/note-brain-icon.svg" path="/quizzes/learning-styles" element={<NoteTaking />} />
          <ChooseQuizItem title="Pretend Leture Quiz" image="/images/conference-education-icon.svg" path="/quizzes/pretend-lecture" element={<PretendLecture />} />
          <ChooseQuizItem title="Note-taking Techniques Quiz" image="/images/note-taking-icon.svg" path="/quizzes/note-taking" element={<LearningStyles />} />
        </div>
      </div>
    </div>
  );
}

export default Home;