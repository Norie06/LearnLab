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

function App() {
  const location = useLocation(); // Get the current route
  const isResourceHubActive = location.pathname === '/resource-hub'; // Check if the current route is Resource Hub

  return (
    <div id="App" className={isResourceHubActive ? 'resource-hub-active' : ''}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/quizzes"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Quizzes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resource-hub"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Resource Hub
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Community
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-up"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Profile
            </NavLink>
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
