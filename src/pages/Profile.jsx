import React, { useState } from 'react';
import './Profile.css';
import '../App.css';
import MyStyleProfile from "../components/MyStyleProfile";

function Profile() {
  const [activeStyle, setActiveStyle] = useState({
    name: "Visual Learner",
    description: "Visual learners absorb information best through images, diagrams, and spatial organization. They excel when concepts are presented visually, such as through charts, graphs, or infographics."
  })

  return (
    <div className="page">
      <div id='profile_banner'>
        <div id='profile_banner_info'>
          <img src="/images/profile_avatar_placeholder.png" alt="Profile" id='profile_picture'/>
          <h1 id='profile_name'>John Doe</h1>
        </div>
        <div id='profile_banner_content'>
          <div id='profile_banner_styles'>
            <button 
              id='learning_style_button'
              onClick={() => setActiveStyle({
                name: "Visual Learner",
                description: "Visual learners absorb information best through images, diagrams, and spatial organization. They excel when concepts are presented visually, such as through charts, graphs, or infographics."
              })}
            >
              <img src="/images/book-open-svgrepo-com.svg" alt="learning_style_icon" className='icon'/>
            </button>
            <button 
              id='note_taking_button'
              onClick={() => setActiveStyle({
                name: "Cornell Notes",
                description: "A structured note-taking method with three sections: cues, notes, and a summary."
              })}
            >
              <img src="/images/note-text-svgrepo-com.svg" alt="note_taking_icon" className='icon' />
            </button>
          </div>
          <MyStyleProfile 
            learning_style_name={activeStyle.name} 
            learning_style_description={activeStyle.description}
          />
        </div>
      </div>
    </div>
  );
}
  
export default Profile;