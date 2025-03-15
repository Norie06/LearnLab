import React from 'react';
import './MyStyleProfile.css';

function MyStyleProfile({ learning_style_name, learning_style_description }) {
  return (
    <div id='profile_banner_description'>
      <h1>{learning_style_name}</h1>
      <p>{learning_style_description}</p>
    </div>
  );
}

export default MyStyleProfile;