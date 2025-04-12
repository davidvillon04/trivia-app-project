import React, { useState, useEffect } from "react";
import AnswerButton from "./AnswerButton";
import "../styles.css";

const QuestionCard = ({ questionObj }) => {
   const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
   const [shuffledAnswers, setShuffledAnswers] = useState([]); // Track shuffled answers

   const { question, correctAnswer, incorrectAnswers } = questionObj;

   // Shuffle answers when the component mounts or when the question changes
   useEffect(() => {
      const answers = [correctAnswer, ...incorrectAnswers];
      const shuffled = [...answers].sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
   }, [correctAnswer, incorrectAnswers]);

   return (
      <div className="question-card">
         <p>{question.text}</p>
         <div className="answer-container">
            {shuffledAnswers.map((answer, index) => (
               <AnswerButton
                  key={index}
                  answer={answer}
                  isCorrect={answer === correctAnswer}
                  isSelected={answer === selectedAnswer}
                  isDisabled={selectedAnswer !== null}
                  onSelect={setSelectedAnswer}
               />
            ))}
         </div>
      </div>
   );
};

export default QuestionCard;
