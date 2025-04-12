import React from "react";
import { Button } from "@mui/material";

const ResultsPanel = ({ score, totalQuestions, onPlayAgain }) => (
   <div className="results">
      <p>
         Final Score: {score}/{totalQuestions}
      </p>
      <Button variant="contained" onClick={onPlayAgain} fullWidth>
         Play Again
      </Button>
   </div>
);

export default ResultsPanel;
