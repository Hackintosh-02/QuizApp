import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { CheckCircle, XCircle } from "lucide-react";

const QuestionCard = ({ question }) => {
  const { handleAnswer, selectedAnswers, currentQuestion, quizEnded } = useQuiz();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option) => {
    if (!quizEnded) {
      setSelectedOption(option.id);
      setShowFeedback(true);
      handleAnswer(option.id);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-white font-medium leading-relaxed">
        {question.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.is_correct;
          const isAnswered = selectedAnswers[currentQuestion] === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              disabled={quizEnded}
              className={`
                relative group p-4 rounded-xl border-2 transition-all duration-200
                flex items-center justify-between
                ${isSelected ? "border-indigo-600 text-indigo-800 bg-indigo-50" : "text-white border-gray-200 hover:text-indigo-400  hover:border-indigo-600 hover:bg-indigo-50"}
                ${quizEnded && isCorrect ? "border-green-500 bg-green-50" : ""}
                ${quizEnded && isAnswered && !isCorrect ? "border-red-500 bg-red-50" : ""}
              `}
            >
              <span className={`text-lg font-medium`}>
                {option.description}
              </span>

              {quizEnded && isCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
              {quizEnded && isAnswered && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
