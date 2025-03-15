import React from 'react';
import FeatureItem from './FeatureItem.jsx';
import './TextBlockList.css';

function TextBlockList({ heading, subheading, topic, json }) {
  // Determine if json is an object with a topic key or an array
  const items = Array.isArray(json) ? json : (json[topic] || []);

  return (
    <div id="features">
      <div id="features_title">
        <h2>{heading}</h2>
        <p>{subheading}</p>
      </div>
      <ul id="features_list" className="text-block-list">
        {items.map((item, index) => (
          <FeatureItem key={index} title={item.title} description={item.description} />
        ))}
      </ul>
    </div>
  );
}

export default TextBlockList;