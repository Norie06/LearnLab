import React, { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  return (
    <QuizContext.Provider value={{ selectedAnswers, setSelectedAnswers }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);