import React, { useEffect, useState } from "react";
import "../App.css"; // Import the CSS file for global styles
import ResourceHubPost from "../components/ResourceHubPost";

function ResourceHubSubpage({ title, folderPath }) { // Correctly destructure props
  const [markdownFiles, setMarkdownFiles] = useState([]);

  useEffect(() => {
    fetch(`${folderPath}/files.json`)
      .then((response) => response.json())
      .then((files) => {
        const fetchPromises = files.map((file) =>
          fetch(`${folderPath}/${file}`).then((res) => res.text())
        );
        return Promise.all(fetchPromises);
      })
      .then((contents) => setMarkdownFiles(contents))
      .catch((error) => console.error("Error fetching files:", error));
  }, [folderPath]);

  return (
    <div className="page" id="resource_hub_subpage">
      <header className="hero">
        <h1>{title}</h1>
      </header>
      <main>
        {markdownFiles.map((content, index) => ( // Add a key for each item
          <ResourceHubPost key={index} content={content} />
        ))}
      </main>
    </div>
  );
}

export default ResourceHubSubpage;