import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./ResourceHubPost.css"; // Import component-specific styles

function ResourceHubPost({ title, content }) {
  const postRef = useRef(null); // Reference to the element
  const [isInView, setIsInView] = useState(false); // State to track if the element is in view

  useEffect(() => {
    const currentRef = postRef.current; // Store the current value
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={postRef}
      className={`resource-hub-post ${isInView ? "in-view" : ""}`} // Add "in-view" class if the element is in view
    >
      <h3>{title}</h3>
      <ReactMarkdown
        components={{
          a: ({ node, children, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default ResourceHubPost;