import React from "react";
import { useQuiz } from "../context/QuizContext";
import { Clock, ArrowLeft, ArrowRight, XCircle } from "lucide-react";
import QuestionCard from "./QuestionCard";

const MainContent = () => {
  const {
    questions,
    currentQuestion,
    nextQuestion,
    prevQuestion,
    endQuiz,
    timer,
    quizEnded,
    loading,
  } = useQuiz();

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>No questions available.</p>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 flex w-auto flex-col">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-full">
            <Clock className="h-5 w-5 text-red-400" />
            <span className="text-white font-mono">{formatTime(timer)}</span>
          </div>
        </div>

        <QuestionCard question={questions[currentQuestion]} />

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
            <span className="text-white"> Previous</span>
          </button>

          <button
            onClick={endQuiz}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <XCircle className="h-5 w-5 text-white" />
            <span className="text-white">End Test</span>
          </button>

          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            <span className="text-white">Next</span>
            <ArrowRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
