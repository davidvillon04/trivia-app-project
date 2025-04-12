import React from "react";
import "../styles.css";

const AnswerButton = ({ answer, correctAnswer, selectedAnswer, onSelect }) => {
   const isSelected = answer === selectedAnswer;
   const isCorrect = answer === correctAnswer;
   const showResults = selectedAnswer !== null;

   let className = "answer-button";
   if (showResults) {
      if (isCorrect) className += " correct";
      else if (isSelected) className += " wrong";
   }

   return (
      <button className={className} onClick={() => onSelect(answer)} disabled={showResults}>
         {answer}
      </button>
   );
};

export default AnswerButton;
