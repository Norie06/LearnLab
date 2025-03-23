import React, { useEffect, useState } from "react";
import './Tests.css';
import '../App.css';
import BeginJourney from "../components/BeginJourney";
import ChooseQuizItem from "../components/ChooseQuizItem";
import TextBlockList from "../components/TextBlockList";
import LearningStyles from "./LearningStylesQuiz";
import NoteTaking from "./NoteTaking";
import PretendLecture from "./PretendLecture";

function Tests() {
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
    <div id="quizzes" className="page">
      <header id="quizzes_hero" className="hero">
        <h1>Tests</h1>
        <p>Test your knowledge and learn more about how you learn best.</p>
      </header>
      <main>
        <BeginJourney />
        <div id='quizzes_choose_quiz' className='choose_quiz'>
          <ChooseQuizItem title="Learning Styles Test" image="/images/note-brain-icon.svg" path="/tests/learning-styles" element={<NoteTaking />} desc={"Many people have a mix of learning styles! Use this test to identify your strengths and combine techniques for a more effective study experience."} />
          <ChooseQuizItem title="Pretend Lecture Test" image="/images/conference-education-icon.svg" path="/tests/pretend-lecture" element={<PretendLecture />} desc={"Do you know whether you learn better when you preview the slides before your lecture? Or , on the other hand, does it distract you? Test it yourself here."} />
          <ChooseQuizItem title="Note-taking Techniques Test" image="/images/note-taking-icon.svg" path="/tests/note-taking" element={<LearningStyles />} desc={"Everyone has their own way of taking notes! Your results will highlight the method that suits you best—but don’t be afraid to mix and match for even better learning."} />
        </div>
        <TextBlockList heading={"Learning Styles"} subheading={"included in the test"} topic={"learning_styles"} json={quizzesDescriptions} style_class={"forty-percent"} />
        <TextBlockList heading={"Pretend Lecture Test"} subheading={"included in the test"} topic={"pretend_lecture"} json={quizzesDescriptions} style_class={"thirty-percent"} />
        <TextBlockList heading={"Note Taking Techniques"} subheading={"included in the test"} topic={"note_taking"} json={quizzesDescriptions} style_class={"forty-percent"}/>
      </main>
    </div>
  );
}

export default Tests;