import React, { useEffect, useState } from "react";
import AnswerButton from "./AnswerButton";
import "../styles.css";

const QuestionCard = ({ questionObj, selectedAnswer, onAnswerSelected }) => {
   const [shuffledAnswers, setShuffledAnswers] = useState([]); // State to hold shuffled answers
   const { question, correctAnswer, incorrectAnswers } = questionObj;

   useEffect(() => {
      const answers = [correctAnswer, ...incorrectAnswers];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
   }, [correctAnswer, incorrectAnswers]);

   return (
      <div className="question-card">
         <p>{question.text}</p>
         <div className="answer-container">
            {shuffledAnswers.map((answer, index) => (
               <AnswerButton
                  key={index}
                  answer={answer}
                  correctAnswer={correctAnswer}
                  selectedAnswer={selectedAnswer}
                  onSelect={onAnswerSelected}
               />
            ))}
         </div>
      </div>
   );
};

export default QuestionCard;
