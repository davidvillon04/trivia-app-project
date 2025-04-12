// App.jsx
import React, { useEffect, useState } from "react";
import { Container, Button, TextField, MenuItem } from "@mui/material";
import QuestionCard from "./components/QuestionCard";
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

   return (
      <Container maxWidth="sm" className="container">
         <h3 className="heading">Trivia Game</h3>
         <div className="settings-form">
            <TextField
               select
               label="Category"
               value={selectedCategory}
               onChange={(e) => setSelectedCategory(e.target.value)}
               fullWidth
               margin="normal"
            >
               <MenuItem value="">Any Category</MenuItem>
               {Object.entries(categories).map(([id, name]) => (
                  <MenuItem key={id} value={id}>
                     {name}
                  </MenuItem>
               ))}
            </TextField>

            <TextField
               type="number"
               label="Number of Questions"
               value={numQuestions}
               onChange={(e) => setNumQuestions(Math.min(25, Math.max(1, e.target.value)))} // Ensure value is between 1 and 25
               fullWidth
               margin="normal"
            />

            <Button variant="contained" onClick={fetchQuestions} disabled={loading} fullWidth>
               {questions.length ? "Get New Questions" : "Start Game"}
            </Button>
         </div>

         {error && <p className="error">{error}</p>}

         {loading && <p>Loading questions...</p>}

         {!loading && questions.length > 0 && (
            <>
               <div className="score">
                  Score: {score} / {questions.length}
               </div>

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
