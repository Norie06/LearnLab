import React, { useEffect, useState } from 'react';
import FeatureItem from '../components/FeatureItem.jsx';
import './Home.css'; // Import the CSS file for Home component

function Home() {
  const [intro, setIntro] = useState('');
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/content/homeIntroText.txt")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => setIntro(text))
      .catch(error => console.error('Error fetching intro text:', error));

    fetch("/content/homeFeatureDescriptions.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setFeatures(data.features))
      .catch(error => console.error('Error fetching feature descriptions:', error));
  }, []);

  return (
    <div>
      <header className="App-header" id="home_hero">
        <div id='home_hero_content'>
          <h1>LearnLab</h1>
          <p>{intro}</p>
        </div>
      </header>
      <div id="home_content" className="Horizontal-list">
        <div id="features">
          <div id="features_title">
            <h2>LearnLab Features</h2>
            <p>You can expect to see here:</p>
          </div>
          <ul id='features_list'>
            {features.map((feature, index) => (
              <FeatureItem key={index} title={feature.title} description={feature.description} />
            ))}
          </ul>
        </div>
        <div id='begin_journey'>
          <p>This is where your studying journey begins!</p>
          <img src="" alt="arrows down" />
        </div>
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <div>
              <p>Content</p>
            </div>
          </li>
          <li>
            <a href="/community">Community</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;