import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Loader2, ChevronRight } from "lucide-react";
import QuestionCard from "./QuestionCard";

const Quiz = ({ setScore, finishQuiz }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setLocalScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/quiz");
        setQuestions(response.data.questions || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnswer = async (isCorrect) => {
    setAnswering(true);
    
    if (isCorrect) {
      setLocalScore(score + 4);
    } else {
      setLocalScore(score - 1);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScore(score);
      finishQuiz();
    }
    
    setAnswering(false);
  };

  if (loading) {
    return (
      <div className="w-5/6 p-12 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading your quiz questions...</p>
      </div>
    );
  }

  return (
    <div className="w-5/6 bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-lg font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <div className="bg-white/20 px-4 py-2 rounded-full">
            <span className="text-white font-medium">Score: {score}</span>
          </div>
        </div>
        <div className="w-full bg-white/20 h-1.5 mt-4 rounded-full">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        {questions.length > 0 ? (
          <div className={`transition-opacity duration-300 ${answering ? 'opacity-50' : 'opacity-100'}`}>
            <QuestionCard 
              question={questions[currentQuestion]} 
              handleAnswer={handleAnswer} 
              questionIndex={currentQuestion + 1} 
              totalQuestions={questions.length}
            />
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-500 text-lg">No questions available</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{questions.length} Total Questions</span>
          <div className="flex items-center space-x-1">
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;