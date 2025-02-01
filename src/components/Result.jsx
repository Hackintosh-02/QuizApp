import React from "react";
import { useQuiz } from "../context/QuizContext";
import { Trophy, RotateCw } from "lucide-react";

const Result = () => {
  const { score, startQuiz } = useQuiz();

  const getScoreMessage = (score) => {
    if (score >= 90) return "Outstanding!";
    if (score >= 70) return "Great job!";
    if (score >= 50) return "Good effort!";
    return "Keep practicing!";
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-yellow-500";
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-blue-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className={`${getScoreColor(score)} p-8 text-center`}>
          <Trophy className="w-16 h-16 mx-auto text-white mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h1>
          <p className="text-white/90 text-lg">{getScoreMessage(score)}</p>
        </div>

        <div className="p-8">
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">{score}</div>
              <div className="text-gray-500">Final Score</div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <RotateCw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
