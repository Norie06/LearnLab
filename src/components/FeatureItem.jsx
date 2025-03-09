import React from 'react';
import './FeatureItem.css'; // Import the CSS file for FeatureItem component

function FeatureItem({ title, description }) {
  return (
    <li class='feature-item'>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

export default FeatureItem;