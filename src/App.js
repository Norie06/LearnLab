import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Tests from './pages/Tests';
import ResourceHub from './pages/ResourceHub';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import LearningStyles from './pages/LearningStylesQuiz';
import NoteTaking from './pages/NoteTaking';
import ScrollToTop from './components/ScrollToTop';

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
          <li className={location.pathname === '/tests' ? 'active-link' : ''}>
            <NavLink to="/tests">Tests</NavLink>
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
          <li className={location.pathname === '/log-in' ? 'active-link' : ''}>
            <NavLink to="/log-in">Log In</NavLink>
          </li>
          <li className={location.pathname === '/sign-up' ? 'active-link' : ''}>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </li>
          <li className={location.pathname === '/profile' ? 'active-link' : ''}>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
      <main className="page">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/resource-hub" element={<ResourceHub />} />
          <Route path="/resource-hub/advanced-cog-concepts" element={<ResourceHub />} />
          <Route path="/resource-hub/learning-styles" element={<ResourceHub />} />
          <Route path="/resource-hub/core-cog-learning" element={<ResourceHub />} />
          <Route path="/resource-hub/note-taking-styles" element={<ResourceHub />} />
          <Route path="/resource-hub/useful-tools" element={<ResourceHub />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<SignIn />} />
          <Route path="/tests/learning-style-test" element={<LearningStyles />}/>
          <Route path="/tests/note-taking-test" element={<NoteTaking />}/>
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
