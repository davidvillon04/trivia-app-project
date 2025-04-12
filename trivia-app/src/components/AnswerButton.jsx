import React from "react";
import "../styles.css";

const AnswerButton = ({ answer, isCorrect, isSelected, onSelect, isDisabled }) => {
   let buttonClass = "answer-button";

   if (isDisabled) {
      if (isCorrect) {
         buttonClass += " correct";
      } else if (isSelected) {
         buttonClass += " wrong";
      }
   }

   return (
      <button className={buttonClass} onClick={() => onSelect(answer)} disabled={isDisabled}>
         {answer}
      </button>
   );
};

export default AnswerButton;
