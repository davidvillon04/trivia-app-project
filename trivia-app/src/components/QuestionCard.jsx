import React from "react";
import "../styles.css";

const QuestionCard = ({ questionObj, onAnswerSelected }) => {
   const questionText = questionObj.question.text;
   const correctAnswer = questionObj.correctAnswer;
   const incorrectAnswers = questionObj.incorrectAnswers;
   const allAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5); // Shuffle answers

   return (
      <div className="question-card">
         <p>{questionText}</p>
         <div className="answer-container">
            {allAnswers.map((answer, index) => (
               <button
                  key={index}
                  className="answer-button"
                  onClick={() => onAnswerSelected(answer, correctAnswer)}
               >
                  {answer}
               </button>
            ))}
         </div>
      </div>
   );
};

export default QuestionCard;
