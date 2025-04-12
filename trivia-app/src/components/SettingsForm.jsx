import React from "react";
import { Button, TextField, MenuItem } from "@mui/material";

const SettingsForm = ({
   categories,
   selectedCategory,
   numQuestions,
   loading,
   questions,
   handleCategoryChange,
   handleNumQuestionsChange,
   handleFetchQuestions,
}) => (
   <div className="settings-form">
      <TextField
         select
         label="Category"
         value={selectedCategory}
         onChange={handleCategoryChange}
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
         onChange={handleNumQuestionsChange}
         fullWidth
         margin="normal"
      />

      <Button variant="contained" onClick={handleFetchQuestions} disabled={loading} fullWidth>
         {questions.length ? "Get New Questions" : "Start Game"}
      </Button>
   </div>
);

export default SettingsForm;
