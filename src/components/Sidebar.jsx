import React from "react";
import { useQuiz } from "../context/QuizContext";

const Sidebar = () => {
  const { questions, selectedAnswers, setCurrentQuestion, currentQuestion, loading } = useQuiz();

  if (loading) return null;

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <h2 className="text-lg font-bold mb-4 text-white">Questions</h2>
      <ul>
        {questions.map((_, index) => (
          <li key={index} className="mb-2">
            <button
              className={`w-full p-2 rounded ${selectedAnswers[index] ? "bg-green-500" : "bg-gray-300"}`}
              onClick={() => setCurrentQuestion(index)}
            >
              Question {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
