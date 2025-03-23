// filepath: c:\Users\Norie\Documents\Coding\LearnLab\src\components\ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // Trigger when the route changes

  return null;
}

export default ScrollToTop;