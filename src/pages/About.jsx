import './About.css';
import '../App.css';

function About() {
  return (
    <div className="page" id="about">
      <header id="about_hero" className="hero">
        <h1>About Us</h1>
      </header>
      <main>
        <h2>How did this come about?</h2>
        <p>
          LearnLab is an interactive online platform designed to help students improve their study habits using evidence-based cognitive science techniques. It provides tools for personalized learning strategies, spaced repetition planning, interactive note-taking experiments, and access to cognitive science resources—all tailored to enhance academic performance.
        </p>
        <p>
          It has become such thanks to the Applied Cognitive Science class at Aarhus University, where the three creators met up and started working on this idea. This is a semester project that has a three-people team working on it.
        </p>
        <h2>Who are the creators?</h2>
        <p>
          There are three of us, all students studying Cognitive Science at Aarhus University, currently in 2nd semester:
        </p>
        <ul>
          <li>
            <span className="bold">Ada</span>, who came up with the idea and focused on the contents of LearnLab.
          </li>
          <li>
            <span className="bold">Katie</span>, who designed the website in Figma and created the lectures.
          </li>
          <li>
            <span className="bold">Nora</span>, who is the main developer of this website and has provided feedback.
          </li>
        </ul>
        <p>
          And, by extent, all of those who participated in fleshing out this project.
        </p>
        <p id='thank_you' className='bold'>
          Thank you all for using this website and creating a wonderful community of students, happy learning!
        </p>
        <img src="/images/like-heart-round-line-icon.svg" alt="" />
      </main>
    </div>
  );
}

export default About;