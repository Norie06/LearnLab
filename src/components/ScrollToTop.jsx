// filepath: c:\Users\Norie\Documents\Coding\LearnLab\src\components\ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try multiple scroll methods for better compatibility
    try {
      // Method 1: Using scrollTo
      window.scrollTo(0, 0);
      
      // Method 2: Using documentElement
      document.documentElement.scrollTop = 0;
      
      // Method 3: Using body
      document.body.scrollTop = 0;
      
    } catch (error) {
      console.error('Failed to scroll:', error);
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;