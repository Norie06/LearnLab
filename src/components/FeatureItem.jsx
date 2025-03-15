import React from 'react';
import './FeatureItem.css'; // Import the CSS file for FeatureItem component

function FeatureItem({ title, description, style_class }) {
  return (
    <li className={style_class}>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

export default FeatureItem;