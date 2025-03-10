import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./ChooseQuizItem.css";

function ChooseQuizItem({ title, image, icon, path, element }) {
  return (
    <li className="quiz-item">
      <h3>{title}</h3>
      <img src={image} alt="note icon" />
      <div>
        <img src={icon} alt="star icon" />
        <Link to={path} >Start</Link>
        <Routes>
            <Route path={path} element={element} />
        </Routes>
      </div>
    </li>
  );
}

export default ChooseQuizItem;