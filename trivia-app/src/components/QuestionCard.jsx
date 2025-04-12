import React from "react";
import { Button } from "@mui/material";
import "../styles.css";

const QuestionCard = ({ questionObj, onAnswerSelected }) => {
   const questionText = questionObj.question.text;
   const correctAnswer = questionObj.correctAnswer;
   const incorrectAnswers = questionObj.incorrectAnswers;
   const allAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5); // Shuffle answers

   return (
      <div className="question-card">
         <p>{questionText}</p>
         {allAnswers.map((answer, index) => (
            <Button
               key={index}
               variant="contained"
               className="answer-button"
               onClick={() => onAnswerSelected(answer, correctAnswer)}
            >
               {answer}
            </Button>
         ))}
      </div>
   );
};

export default QuestionCard;
