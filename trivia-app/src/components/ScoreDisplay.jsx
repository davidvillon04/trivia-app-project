import React from "react";

const ScoreDisplay = ({ score, total }) => (
   <div className="score">
      Score: {score} / {total}
   </div>
);

export default ScoreDisplay;
