import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import "../App.css";
import "./LectureVideo.css";

function LectureVideo() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const [hasClickedSlides, setHasClickedSlides] = useState(false); // New state to track if slides were clicked
  const [showVideo, setShowVideo] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false); // New state to disable video

  const handleVideoComplete = () => {
    setHasWatchedVideo(true);
    setVideoDisabled(true); // Disable the video after it has been watched
  };

  const handleContinue = () => {
    navigate(`/tests/pretend-lecture/${videoId}/test`);
  };

  const handleSlidesClick = () => {
    setHasClickedSlides(true);
    setShowVideo(true); // Show video when slides are clicked
  };

  const videoIds = {
    '1': 'fJS-ccsKcxE', // Preview slides before lecture
    '2': 'IpNw4osZtwQ',  // See slides after lecture
    '3': '6Q2rXtBleuE'   // No slides access
  };

  const videoTitles = {
    '1': 'Cardiac Diseases',
    '2': 'Needs, Goods, Services, Scarcity, and Choice',
    '3': 'Cognitive Development Stages'
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
      disablekb: videoDisabled ? 1 : 0, // Disable keyboard controls if video is disabled
    },
  };

  const renderContent = () => {
    switch(videoId) {
      case '1': // Preview slides before lecture
        return (
          <>
            <p><b>First, your task is to read the slides before watching the presentation.</b></p>
            <button className="slides-button" onClick={handleSlidesClick}>
              <a href={`https://drive.google.com/file/d/13ut-2mQhXyEReIhTPrVrc8fUrjsAK7o7/view`} target="_blank" rel="noopener noreferrer">
                <img src="/images/star-white.svg" alt="star icon" />
                Slides
                <img src="/images/star-white.svg" alt="star icon" />
              </a>
            </button>
            {showVideo ? (
              <div>
                <p><b>Next, watch the video lecture. Try to remember as much information as you can. </b></p>
                <div className="video-container">
                  <YouTube
                    videoId={videoIds[videoId]}
                    opts={opts}
                    onEnd={handleVideoComplete}
                    onStateChange={(e) => {
                      if (videoDisabled && e.data === 1) {
                        e.target.stopVideo(); // Stop the video if it's disabled
                      }
                    }}
                  />
                </div>
                <p style={{justifySelf: 'center'}}>-- You can only proceed when you have watched the video <b>all the way</b> through. --</p>
              </div>
            ) : (
              <p style={{justifySelf: 'center'}}>-- View the slides to see the video --</p>
            )}
          </>
        );
      
      case '2': // See slides after watching lecture
        return (
          <>
            <p><b>First, your task is to listen to a video lecture about Needs, Goods, Services, Scarcity, and Choice. Try to remember as much information as you can. You are allowed to watch the video once. </b></p>
            <div className="video-container">
              <YouTube
                videoId={videoIds[videoId]}
                opts={opts}
                onEnd={handleVideoComplete}
                onStateChange={(e) => {
                  if (videoDisabled && e.data === 1) {
                    e.target.stopVideo(); // Stop the video if it's disabled
                  }
                }}
              />
            </div>
            {hasWatchedVideo && (
              <>
                <p><b>Now you can review the slides from the presentation.</b></p>
                <button className="slides-button" onClick={handleSlidesClick}>
                  <a href={`https://drive.google.com/file/d/13ut-2mQhXyEReIhTPrVrc8fUrjsAK7o7/view`} target="_blank" rel="noopener noreferrer">
                    <img src="/images/star-white.svg" alt="star icon" />
                      Slides
                    <img src="/images/star-white.svg" alt="star icon" />
                  </a>
                </button>
              </>
            )}
          </>
        );
      
      case '3': // No slides access
        if (!hasClickedSlides) {
          setHasClickedSlides(true); // Set to true when the button is clicked
        }
        return (
          <>
            <p>First, your task is to listen to a video lecture about <b>Cognitive Development Stages</b>. Try to <b>remember</b> as much information as you can. You are allowed to watch the video <b>once</b>. When you finish, <b>press the NEXT button</b> (only available after watching the video <b>all the way through</b>).</p>
            <div className="video-container">
              <YouTube
                videoId={videoIds[videoId]}
                opts={opts}
                onEnd={handleVideoComplete}
                onStateChange={(e) => {
                  if (videoDisabled && e.data === 1) {
                    e.target.stopVideo(); // Stop the video if it's disabled
                  }
                }}
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
        <h1>Lecture {videoId}: {videoTitles[videoId]}</h1>
      </header>
      <main>
        <div className="container">
          {renderContent()}
          {hasWatchedVideo && hasClickedSlides && (
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