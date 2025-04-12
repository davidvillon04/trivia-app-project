import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import QuestionCard from "./components/QuestionCard";
import SettingsForm from "./components/SettingsForm";
import ScoreDisplay from "./components/ScoreDisplay";
import "./styles.css";

function App() {
   const [questions, setQuestions] = useState([]);
   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState({});
   const [selectedCategory, setSelectedCategory] = useState("");
   const [numQuestions, setNumQuestions] = useState(5);
   const [score, setScore] = useState(0);
   const [selectedAnswers, setSelectedAnswers] = useState([]);
   const [error, setError] = useState("");

   // Fetch categories on mount
   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await fetch("https://the-trivia-api.com/v2/categories");
            const data = await response.json();
            setCategories(data);
         } catch (error) {
            console.error("Error fetching categories:", error);
         }
      };
      fetchCategories();
   }, []);

   // Fetch questions with user input
   const fetchQuestions = async () => {
      if (numQuestions < 1 || numQuestions > 25) {
         setError("Please choose between 1 and 25 questions");
         return;
      }

      setLoading(true);
      setError("");
      try {
         let url = `https://the-trivia-api.com/v2/questions?limit=${numQuestions}`;
         if (selectedCategory) url += `&categories=${selectedCategory}`;

         const response = await fetch(url);
         const data = await response.json();

         if (!data.length) throw new Error("No questions found");

         setQuestions(data);
         setSelectedAnswers(Array(data.length).fill(null));
         setScore(0);
      } catch (error) {
         setError(error.message);
         setQuestions([]);
      } finally {
         setLoading(false);

         window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top after fetching questions
      }
   };

   // Handle answer selection
   const handleAnswer = (questionIndex, answer, correctAnswer) => {
      const newAnswers = [...selectedAnswers]; // Create a copy of the current answers
      newAnswers[questionIndex] = answer;
      setSelectedAnswers(newAnswers);

      // Check if the answer is correct
      if (answer === correctAnswer) {
         setScore((prev) => prev + 1);
      }
   };

   const allAnswered = selectedAnswers.every((answer) => answer !== null); // Check if all questions have been answered

   // Scroll to the bottom when all questions are answered
   useEffect(() => {
      if (allAnswered) {
         window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
         });
      }
   }, [allAnswered]);

   const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
   const handleNumQuestionsChange = (e) =>
      setNumQuestions(Math.min(25, Math.max(1, e.target.value))); // Ensure value is between 1 and 25

   return (
      <Container maxWidth="sm" className="container">
         <h3 className="heading">Trivia Game</h3>

         <SettingsForm
            categories={categories}
            selectedCategory={selectedCategory}
            numQuestions={numQuestions}
            loading={loading}
            questions={questions}
            handleCategoryChange={handleCategoryChange}
            handleNumQuestionsChange={handleNumQuestionsChange}
            handleFetchQuestions={fetchQuestions}
         />

         {error && <p className="error">{error}</p>}
         {loading && <p>Loading questions...</p>}

         {!loading && questions.length > 0 && (
            <>
               <ScoreDisplay score={score} total={questions.length} />

               {questions.map((question, index) => (
                  <QuestionCard
                     key={index}
                     questionObj={question}
                     selectedAnswer={selectedAnswers[index]}
                     onAnswerSelected={(answer) =>
                        handleAnswer(index, answer, question.correctAnswer)
                     }
                  />
               ))}

               {allAnswered && (
                  <div className="results">
                     <p>
                        Final Score: {score}/{questions.length}
                     </p>
                     <Button variant="contained" onClick={fetchQuestions} disabled={!allAnswered}>
                        Play Again
                     </Button>
                  </div>
               )}
            </>
         )}
      </Container>
   );
}

export default App;
