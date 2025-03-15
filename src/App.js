import { Routes, Route, Link } from 'react-router-dom';
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

function App() {
  return (
    <div id="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/quizzes">Quizzes</Link>
          </li>
          <li>
            <Link to="/resource-hub">Resource Hub</Link>
          </li>
          <li>
            <Link to="/community">Community</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Register</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <main className='page'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/resource-hub" element={<ResourceHub />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
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
