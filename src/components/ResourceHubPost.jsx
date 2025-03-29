import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./ResourceHubPost.css"; // Import component-specific styles

function ResourceHubPost({ title, content }) {
  const postRef = useRef(null); // Reference to the element
  const [isInView, setIsInView] = useState(false); // State to track if the element is in view

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if the element is near the center of the viewport
        setIsInView(entry.isIntersecting);
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={postRef}
      className={`resource-hub-post ${isInView ? "in-view" : ""}`} // Add "in-view" class if the element is in view
    >
      <h3>{title}</h3>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default ResourceHubPost;