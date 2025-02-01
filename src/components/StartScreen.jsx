import React from "react";
import { useQuiz } from "../context/QuizContext";

const StartScreen = () => {
  const { startQuiz } = useQuiz();

  console.log("StartScreen Rendered"); // Debugging log
  console.log("startQuiz function:", startQuiz); // Check if function exists

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz!</h1>
      <button
        className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
        onClick={() => {
          console.log("Start Quiz Button Clicked"); // Debug log for button click
          startQuiz(); // Call the function
        }}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
