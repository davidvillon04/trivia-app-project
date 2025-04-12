import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import QuestionCard from "./components/QuestionCard";
import "./styles.css";

function App() {
   const [questions, setQuestions] = useState([]);
   const [loading, setLoading] = useState(true);

   // Fetch questions when the component mounts
   useEffect(() => {
      const fetchQuestions = async () => {
         setLoading(true);
         try {
            const response = await fetch("https://the-trivia-api.com/v2/questions?limit=5");
            const data = await response.json();

            setQuestions(data);
         } catch (error) {
            console.error("Error fetching trivia questions:", error);
            setQuestions([]);
         } finally {
            setLoading(false);
         }
      };

      fetchQuestions();
   }, []);

   if (loading) {
      return (
         <Container maxWidth="sm" className="container">
            <h5>Loading trivia questions...</h5>
         </Container>
      );
   }

   if (!questions.length) {
      return (
         <Container maxWidth="sm" className="container">
            <h5>No questions available.</h5>
         </Container>
      );
   }

   return (
      <Container maxWidth="sm" className="container">
         <h3 className="heading">Trivia Game</h3>

         {questions.map((question, index) => (
            <QuestionCard key={index} questionObj={question} />
         ))}
      </Container>
   );
}

export default App;
