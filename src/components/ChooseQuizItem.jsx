import React from "react";
import { Link } from "react-router-dom";
import "./ChooseQuizItem.css";

function ChooseQuizItem({ title, image, path, desc }) {
  return (
    <li className="quiz-item">
      <h3>{title}</h3>
      <img src={image} alt="note icon" height={220} />
      <Link to={path}>
        <button>
          <img src="/images/star-white.svg" alt="star icon" />
          Start
        </button>
      </Link>
      <p>
        {desc}
      </p>
    </li>
  );
}

export default ChooseQuizItem;