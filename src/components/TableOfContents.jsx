import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TableOfContents.css';

function TableOfContents({ contents }) {
  const navigate = useNavigate();
  const location = useLocation();

  const extractH1Headings = (markdownContent) => {
    // Match only h1 headings (single #)
    const headingRegex = /^#\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const title = match[1];
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ title, slug });
    }

    return headings;
  };

  const handleClick = (e, slug) => {
    e.preventDefault();
    // Update URL with hash
    navigate(`${location.pathname}#${slug}`, { replace: true });
    
    // Scroll to element
    setTimeout(() => {
      const element = document.getElementById(slug);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const allHeadings = contents.flatMap((content, index) => 
    extractH1Headings(content).map(heading => ({
      ...heading,
      slug: `section-${index}-${heading.slug}`
    }))
  );

  return (
    <nav className="table-of-contents">
      <h2>Table of Contents</h2>
      <ul>
        {allHeadings.map((heading, index) => (
          <li key={index}>
            <a 
              href={`#${heading.slug}`}
              onClick={(e) => handleClick(e, heading.slug)}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;