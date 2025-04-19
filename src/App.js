import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
// import Community from './pages/Community';
// import Profile from './pages/Profile';
import Tests from './pages/Tests';
import ResourceHub from './pages/ResourceHub';
// import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
import LearningStyles from './pages/LearningStylesQuiz';
import LearningStylesResults from './pages/LearningStylesResults';
import NoteTaking from './pages/NoteTaking';
import NoteTakingResults from './pages/NoteTakingResults';
import PretendLecture from './pages/PretendLecture';
import ResourceHubSubpage from './pages/ResourceHubSubpage';
import NotAvailable from './pages/NotAvailable';
import LectureVideo from './components/LectureVideo';
import LectureQuiz from './components/LectureQuiz';
import LectureResults from './components/LectureResults';
import LectureFinalResults from './components/LectureFinalResults';

import ScrollToTop from './components/ScrollToTop';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation(); // Get the current route

  // Add this helper function at the top of your component
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000); // Adjust the delay as needed
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <DotLottieReact
          src="https://lottie.host/69eb9efe-27bc-42ba-be3d-df1c17e49468/LicLOFH7mf.lottie"
          autoplay
          loop
          style={{ width: '30%', height: '30%' }}
        />
      </div>
    );
  }

  return (
    <AuthProvider>
      <div id="App">
        <ScrollToTop />
        <nav>
          <ul className='placeholder' id='placeholder_1'></ul>
          <ul id='main_pages'>
            <li className={isActiveRoute('/') ? 'active-link' : ''}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className={isActiveRoute('/tests') ? 'active-link' : ''}>
              <NavLink to="/tests">Tests</NavLink>
            </li>
            <li className={isActiveRoute('/resource-hub') ? 'active-link' : ''}>
              <NavLink to="/resource-hub">Resource Hub</NavLink>
            </li>
            <li className={isActiveRoute('/community') ? 'active-link' : ''}>
              <NavLink to="/community">Community</NavLink>
            </li>
            <li className={isActiveRoute('/about') ? 'active-link' : ''}>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
          <ul>
            <li className='placeholder' id='placeholder_2'></li>
            <li className={isActiveRoute('/log-in') ? 'active-link' : ''}>
              <NavLink to="/log-in">Log In</NavLink>
            </li>
            <li className={isActiveRoute('/sign-up') ? 'active-link' : ''}>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </li>
            <li className={isActiveRoute('/profile') ? 'active-link' : ''}>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        </nav>
        <main className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<NotAvailable />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/tests" element={<Tests />} />
            <Route path="/resource-hub" element={<ResourceHub />} />
            <Route path="/resource-hub/advanced-cog-concepts" element={<ResourceHubSubpage title="Advanced Cognitive Concepts" folderPath="../content/resource-hub/advanced-cog-concepts" css="adv" />} />
            <Route path="/resource-hub/learning-styles" element={<ResourceHubSubpage title="Learning Styles" folderPath="../content/resource-hub/learning-styles" css="learn" />} />
            <Route path="/resource-hub/core-cog-learning" element={<ResourceHubSubpage title="Core Cognitive Learning Concepts" folderPath="../content/resource-hub/core-cognitive-learning-concepts" css="core" />} />
            <Route path="/resource-hub/note-taking-styles" element={<ResourceHubSubpage title="Note-Taking Styles" folderPath="../content/resource-hub/note-taking-styles" css="note" />} />
            <Route path="/resource-hub/useful-tools" element={<ResourceHubSubpage title="More Useful Interactive Tools" folderPath="../content/resource-hub/more-tools" css="tools" />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/log-in" element={<SignIn />} />
            <Route path="/tests/learning-styles" element={<LearningStyles />}/>
            <Route path="/tests/learning-styles/results" element={<LearningStylesResults />}/>
            <Route path="/tests/note-taking" element={<NoteTaking />}/>
            <Route path="/tests/note-taking/results" element={<NoteTakingResults />}/>
            <Route path="/tests/pretend-lecture" element={<PretendLecture />}/>
            <Route path="/tests/pretend-lecture/:videoId/video" element={<LectureVideo />} />
            <Route path="/tests/pretend-lecture/:videoId/test" element={<LectureQuiz />} />
            <Route path="/tests/pretend-lecture/:videoId/results" element={<LectureResults />} />
            <Route path="/tests/pretend-lecture/final-results" element={<LectureFinalResults />} />
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
    </AuthProvider>
  );
}

export default App;