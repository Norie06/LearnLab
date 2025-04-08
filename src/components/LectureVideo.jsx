import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import "../App.css";
import "./LectureVideo.css";

function LectureVideo() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);

  const handleVideoComplete = () => {
    setHasWatchedVideo(true);
  };

  const handleContinue = () => {
    navigate(`/pretend-lecture/quiz/${videoId}`);
  };

  const videoIds = {
    '1': 'b_H0V1-kQbE', // Preview slides before lecture
    '2': 'VIDEO_ID_2',  // See slides after lecture
    '3': 'VIDEO_ID_3'   // No slides access
  };

  const videoTitles = {
    '1': 'Cardiac Diseases',
    '2': 'Basic Economics',
    '3': 'World History Overview'
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  const renderContent = () => {
    switch(videoId) {
      case '1': // Preview slides before lecture
        return (
          <>
            <p><b>First, your task is to read the slides before watching the presentation.</b></p>
            <button className="slides-button">
              <a href={`https://drive.google.com/file/d/13ut-2mQhXyEReIhTPrVrc8fUrjsAK7o7/view`} target="_blank" rel="noopener noreferrer">
                <img src="/images/star-white.svg" alt="star icon" />
                Slides
                <img src="/images/star-white.svg" alt="star icon" />
              </a>
            </button>
            <p><b>Next, watch the video lecture. Try to remember as much information as you can. </b></p>
            <p>! You can only proceed when you have watched the video <b>all the way</b> through</p>
            <div className="video-container">
              <YouTube
                videoId={videoIds[videoId]}
                opts={opts}
                onEnd={handleVideoComplete}
              />
            </div>
          </>
        );
      
      case '2': // See slides after watching lecture
        return (
          <>
            <p><b>First, watch the video lecture. Try to remember as much information as you can.</b></p>
            <div className="video-container">
              <YouTube
                videoId={videoIds[videoId]}
                opts={opts}
                onEnd={handleVideoComplete}
              />
            </div>
            {hasWatchedVideo && (
              <>
                <p><b>Now you can review the slides from the presentation.</b></p>
                <button className="slides-button">
                  <a href={`/content/lecture${videoId}Slides.pdf`} target="_blank" rel="noopener noreferrer">
                    View Slides
                  </a>
                </button>
              </>
            )}
          </>
        );
      
      case '3': // No slides access
        return (
          <>
            <p><b>Watch the video lecture. Try to remember as much information as you can.</b></p>
            <div className="video-container">
              <YouTube
                videoId={videoIds[videoId]}
                opts={opts}
                onEnd={handleVideoComplete}
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="page" id='lecture-video'>
      <header className="hero">
        <h1>Pretend Lecture {videoId}: {videoTitles[videoId]}</h1>
      </header>
      <main>
        <div className="container">
          {renderContent()}
          {hasWatchedVideo && (
            <button className="button" onClick={handleContinue}>
              <img src="/images/star-white.svg" alt="star icon" />
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default LectureVideo;