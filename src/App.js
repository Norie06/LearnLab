import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Quizzes from './pages/Quizzes';
import ResourceHub from './pages/ResourceHub';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import LearningStyles from './pages/LearningStylesQuiz';
import NoteTaking from './pages/NoteTaking';

function App() {
  const location = useLocation(); // Get the current route

  return (
    <div id="App">
      <nav>
        <ul id='placeholder'></ul>
        <ul id='main_pages'>
          <li className={location.pathname === '/' ? 'active-link' : ''}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={location.pathname === '/quizzes' ? 'active-link' : ''}>
            <NavLink to="/quizzes">Quizzes</NavLink>
          </li>
          <li className={location.pathname === '/resource-hub' ? 'active-link' : ''}>
            <NavLink to="/resource-hub">Resource Hub</NavLink>
          </li>
          <li className={location.pathname === '/community' ? 'active-link' : ''}>
            <NavLink to="/community">Community</NavLink>
          </li>
          <li className={location.pathname === '/about' ? 'active-link' : ''}>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
        <ul>
          <li className={location.pathname === '/sign-in' ? 'active-link' : ''}>
            <NavLink to="/sign-in">Sign In</NavLink>
          </li>
          <li className={location.pathname === '/sign-up' ? 'active-link' : ''}>
            <NavLink to="/sign-up">Register</NavLink>
          </li>
          <li className={location.pathname === '/profile' ? 'active-link' : ''}>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/resource-hub" element={<ResourceHub />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/quizzes/learning-styles" element={<LearningStyles />}/>
          <Route path="/quizzes/note-taking" element={<NoteTaking />}/>
        </Routes>
        <footer>
          <div id="footer_links">
            <div id="footer_links_about">
              <h4>LearnLab</h4>
              <ul className="footer_links_list">
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
            </div>
            <div id="footer_links_contact">
              <h4>Contact</h4>
              <ul className="footer_links_list">
                <li>
                  <a href="/contact">Contact us</a>
                </li>
              </ul>
            </div>
          </div>
          <div id="footer_legal">
            <p>© 2025 LearnLab</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
