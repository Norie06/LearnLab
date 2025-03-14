import React, { useEffect, useState } from "react";
import BeginJourney from "../components/BeginJourney";
import './Quizzes.css';
import ChooseQuizItem from "../components/ChooseQuizItem";
import LearningStyles from "./LearningStyles";
import NoteTaking from "./NoteTaking";
import PretendLecture from "./PretendLecture";
import TextBlockList from "../components/TextBlockList";

function Quizzes() {
  const [quizzesDescriptions, setQuizzesDescriptions] = useState([]);

  useEffect(() => {
    fetch("/content/quizzesDescriptions.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setQuizzesDescriptions(data))
      .catch(error => console.error('Error fetching quizzes descriptions:', error));
  }, []);

  return (
    <div id="quizzes">
      <header id="quizzes_hero" className="App-header">
        <div id='quizzes_hero_content' className="hero-content">
          <h1>Quizzes</h1>
          <p>Test your knowledge and learn more about how you learn best.</p>
        </div>
      </header>
      <main>
        <BeginJourney />
        <div id='quizzes_choose_quiz' className='choose_quiz'>
          <ChooseQuizItem title="Learning Styles Quiz" image="/images/note-brain-icon.svg" path="/quizzes/learning-styles" element={<NoteTaking />} />
          <ChooseQuizItem title="Pretend Lecture Quiz" image="/images/conference-education-icon.svg" path="/quizzes/pretend-lecture" element={<PretendLecture />} />
          <ChooseQuizItem title="Note-taking Techniques Quiz" image="/images/note-taking-icon.svg" path="/quizzes/note-taking" element={<LearningStyles />} />
        </div>
        <TextBlockList heading={"Learning Styles"} subheading={"included in the quiz"} topic={"learning_styles"} json={quizzesDescriptions} />
        <TextBlockList heading={"Pretend Lecture Quiz"} subheading={"included in the quiz"} topic={"pretend_lecture"} json={quizzesDescriptions} />
        <TextBlockList heading={"Note Taking Techniques"} subheading={"included in the quiz"} topic={"note_taking"} json={quizzesDescriptions}/>
      </main>
    </div>
  );
}

export default Quizzes;