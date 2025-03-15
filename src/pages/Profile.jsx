import React from 'react';
import './Profile.css';
import '../App.css';
import MyStyleProfile from "../components/MyStyleProfile";

function Profile() {
  return (
    <div className="page">
      <div id='profile_banner'>
        <div id='profile_banner_info'>
          <img src="/images/profile_avatar_placeholder.png" alt="Profile" id='profile_picture'/>
          <h1 id='profile_name'>John Doe</h1>
        </div>
        <div id='profile_banner_styles'>
          <button>
            <img src="/images/book-open-svgrepo-com.svg" alt="learning_style_icon" className='icon'/>
          </button>
          <button>
            <img src="/images/note-text-svgrepo-com.svg" alt="note_taking_icon" className='icon' />
          </button>
        </div>
        <MyStyleProfile learning_style_name="Visual Learner" learning_style_description="Visual learners absorb information best through images, diagrams, and spatial organization. They excel when concepts are presented visually, such as through charts, graphs, or infographics." />
      </div>
    </div>
  );
}
  
export default Profile;