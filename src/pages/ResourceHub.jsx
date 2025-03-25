import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './ResourceHub.css';

function ResourceHub() {
  return (
    <div id='resource_hub' className='page'>
      <header className="hero">
        <h1>Resource Hub</h1> 
      </header>
      <main>
        <Link to={'/resource-hub/core-cog-learning'} className='topic-card'>
          <div className='topic-content'>
            <h2>Core Cognitive Learning Concepts</h2>
          </div>
          <img src="/images/pencil-tip-7.svg" alt="" />
        </Link>
        <Link to={'/resource-hub/advanced-cog-concepts'} className='topic-card'>
          <div className='topic-content'>
            <h2>Advanced Cognitive Concepts</h2>
          </div>
          <img src="/images/pencil-tip-7.svg" alt="" />
        </Link>
        <Link to={'/resource-hub/learning-styles'} className='topic-card'>
          <div className='topic-content'>
            <h2>Learning Styles</h2>
          </div>
          <img src="/images/pencil-tip-7.svg" alt="" />
        </Link>
        <Link to={'/resource-hub/note-taking-styles'} className='topic-card'>
          <div className='topic-content'>
            <h2>Note-Taking Styles</h2>
          </div>
          <img src="/images/pencil-tip-7.svg" alt="" />
        </Link>
        <Link to={'/resource-hub/useful-tools'} className='topic-card'>
          <div className='topic-content'>
            <h2>More Useful Interactive Tools</h2>
          </div>
          <img src="/images/pencil-tip-7.svg" alt="" />
        </Link>
        
      </main>
    </div>
  );
}

export default ResourceHub;