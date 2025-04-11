import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
// import "../App.css";
import "../App.css";
import "./PretendLecture.css";

function PretendLecture() {
  const navigate = useNavigate();

  const lectureOptions = [
    { id: 1, title: "Preview the slides before the lecture" },
    { id: 2, title: "See the slides after the lecture" },
    { id: 3, title: "Have the slides available just during the lecture" }
  ];

  const handleLectureSelect = (id) => {
    navigate(`/tests/pretend-lecture/${id}/video`);
  };

  return (
    <div className="page" id='pretend-lecture'>
      <header className="hero">
        <h1>Pretend Lecture Tests</h1>
      </header>
      <main>
        <div className="container">
          <h2>Welcome to the Pretend Lectures!</h2>
          <p>
            Do you know whether you learn better when you preview the slides before your lecture? Or, on the other hand, does it distract you? Test it yourself here:
          </p>
          <p>Which one would you like to try first?</p>
          <ul className="lecture-list">
            {lectureOptions.map((lecture) => (
              <li key={lecture.id} className="lecture-item">
                <p>{lecture.title}</p>
                <button 
                  className="play-button"
                  onClick={() => handleLectureSelect(lecture.id)}
                  aria-label={`Start lecture ${lecture.id}`}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default PretendLecture;